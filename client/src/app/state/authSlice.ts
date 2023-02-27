import { LoginValues } from "../../models/LoginValues";
import { postRequest, putRequest } from "../../services/httpRequest";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { InitialAuth } from "../../models/InitialAuth";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage
} from "../../utils/LocalStorageFunctions";
import { SignUpValues } from "../../models/SignUpValues";
import { User } from "../../models/User";

export const initialAuth: InitialAuth = {
  token: "",
  user: {
    email: "",
    lastName: "",
    name: "",
    id: "",
    documentId: undefined,
    birthdate: undefined,
    isAdmin: false,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getLocalStorage("auth") ? getLocalStorage("auth") : initialAuth,

  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: () => {
      clearLocalStorage("auth");
      return initialAuth;
    },
    setUserInformation: (state, action) => {
      state.user = {
        name: action.payload.name,
        lastName: action.payload.lastName,
        documentId: action.payload.documentId,
        birthday: action.payload.birthdate,
        createdAt: state.user.createdAt,
        updatedAt: state.user.updatedAt,
        deletedAt: state.user.deletedAt,
        isAdmin: state.user.isAdmin,
        id: state.user.id
      };
    }
  }
});

export const { setLogin, setLogout, setUserInformation } = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (dataLogin: LoginValues) => async (dispatch: Dispatch) => {
  try {
    const auth = (await postRequest(dataLogin, "/users/login")) as InitialAuth;
    if (auth.token !== "") {
      dispatch(setLogin(auth));
      const authInStorage = { token: auth.token, user: auth.user };
      setLocalStorage("auth", authInStorage);
      return { login: true, msg: "Usuario logeado con éxito!" };
    }
    return false;
  } catch (error) {
    const msgError = error as string;
    return { login: false, msg: msgError.toString() };
  }
};

export const signUpUser = (dataSignUp: SignUpValues) => async () => {
  try {
    await postRequest(dataSignUp, "/users");
    return true;
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
  }
};

export const updateUserInformation = (UserInformation: User) => async (dispatch: Dispatch) => {
  try {
    const update = await putRequest("/users/", UserInformation.id, UserInformation);
    if (update) {
      dispatch(setUserInformation(update.params));
      const localStorageAuth = getLocalStorage("auth");
      const auth = {
        token: localStorageAuth.token,
        user: {
          ...localStorageAuth.user,
          name: update.params.name,
          lastName: update.params.lastName,
          documentId: update.params.documentId,
          birthdate: update.params.birthdate
        }
      };
      setLocalStorage("auth", auth);
      return "Perfil actualizado con éxito";
    }
    return false;
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
  }
};
