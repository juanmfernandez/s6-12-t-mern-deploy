import axios from "axios";

const URL: string = import.meta.env.VITE_API_URL;
const TOKEN_IG: string = import.meta.env.VITE_API_TOKEN_IG;
const URL_IG: string = import.meta.env.VITE_API_URL_IG;

// @ts-ignore
const { token } = JSON.parse(localStorage.getItem("auth")) || "";
const Authorization = token && `Bearer ${token}`;

export const postRequest = async (dataObject: {}, endpoint: string) => {
  try {
    const { data } = await axios.post(URL + endpoint, dataObject, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization
      }
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const getRequest = async (endpoint: string) => {
  try {
    const { data } = await axios.get(URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization
      }
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const putRequest = async (endpoint: string, id: number | string, dataUpdate: {}) => {
  try {
    const { data } = await axios.put(URL + endpoint + id, dataUpdate, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization
      }
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const deleteRequest = async (endpoint: string, id: string) => {
  try {
    const { data } = await axios.delete(URL + endpoint + id, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization
      }
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const postRequestFile = async (endpoint: string, dataWithFile: {}) => {
  try {
    const { data } = await axios.post(URL + endpoint, dataWithFile, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization
      }
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const getDataIG = async () => {
  try {
    const { data } = await axios.get(URL_IG + TOKEN_IG, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
