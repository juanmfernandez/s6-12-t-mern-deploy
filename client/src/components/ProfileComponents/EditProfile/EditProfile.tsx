import { useState, useEffect } from "react";
import { AppDispatch } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { User } from "../../../models/User";
import { AppStore } from "../../../app/store";
import { updateUserInformation } from "../../../app/state/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userInformationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("Email requerido"),
  name: Yup.string()
    .min(3, "Nombre minimo 3 caracteres")
    .max(20, "Nombre maximo 20 caracteres")
    .required("Nombre requerido"),
  lastName: Yup.string()
    .min(3, "Apellido minimo 3 caracteres")
    .max(20, "Apellido maximo 20 caracteres")
    .required("Apellido requerido"),
  documentId: Yup.number().min(6, "Documento minimo 6 caracteres").required("Documento requerido")
});

type ProfileProps = {
  mode: string;
};

export default function EditProfile({ mode }: ProfileProps) {
  const dispatch = useDispatch<AppDispatch>();
  const UserInformation: User = useSelector((store: AppStore) => store.auth.user);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const USER__INFORMATION__VALUES__FORM: User = {
    email: UserInformation.email,
    name: UserInformation.name,
    lastName: UserInformation.lastName,
    documentId: UserInformation.documentId || 0,
    birthdate: UserInformation.birthdate || date,
    id: UserInformation.id
  };

  const handleSubmitEditUser = async (values: User) => {
    const updatedUserValues: User = {
      email: values.email,
      name: values.name,
      lastName: values.lastName,
      documentId: values.documentId,
      birthdate: date
        .toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" })
        .split("/")
        .reverse()
        .join("/"),
      id: UserInformation.id
    };
    const updateProfile = await dispatch(updateUserInformation(updatedUserValues));
    if (updateProfile == "Perfil actualizado con éxito") {
      toast.success(updateProfile.toString(), {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      toast.error(updateProfile.toString(), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };

  useEffect(() => {
    if (UserInformation.birthdate) {
      setDate(new Date(UserInformation.birthdate));
    }
  }, [UserInformation.birthdate]);

  return (
    <div className="profile__information">
      <h1 className="profile__information__title">DATOS DE USUARIO</h1>
      <Formik
        initialValues={USER__INFORMATION__VALUES__FORM}
        validationSchema={userInformationSchema}
        onSubmit={async (values: User) => {
          handleSubmitEditUser(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="profile__information__form">
            <label className="profile__information__form__label" htmlFor="email">
              Email
            </label>
            <Field
              className="profile__information__form__field profile__information__form__field__onlyread"
              readOnly
              name="email"
              placeholder="E-mail"
            />
            {errors.email && touched.email ? (
              <div className="profile__information__form__error">{errors.email}</div>
            ) : null}

            <label className="profile__information__form__label" htmlFor="name">
              Nombre
            </label>
            <Field className="profile__information__form__field" name="name" placeholder="Nombre" />
            {errors.name && touched.name ? (
              <div className="profile__information__form__error">{errors.name}</div>
            ) : null}

            <label className="profile__information__form__label" htmlFor="lastName">
              Apellido
            </label>
            <Field
              className="profile__information__form__field"
              name="lastName"
              placeholder="Apellido"
            />
            {errors.lastName && touched.lastName ? (
              <div className="profile__information__form__error">{errors.lastName}</div>
            ) : null}

            <label className="profile__information__form__label" htmlFor="documentId">
              Documento
            </label>
            <Field
              className="profile__information__form__field"
              name="documentId"
              placeholder="Documento"
            />
            {errors.documentId && touched.documentId ? (
              <div className="profile__information__form__error">{errors.documentId}</div>
            ) : null}

            <label className="profile__information__form__label" htmlFor="fechaDeNacimiento">
              Fecha de Nacimiento
            </label>
            <DatePicker
              className="profile__information__form__datepicker"
              selected={date}
              onChange={date => {
                if (date) {
                  setDate(date);
                }
              }}
            />

            {mode === "profile" ? (
              <>
                <h2 className="profile__information__form__subtitle">NOTIFICACIONES</h2>
                <div className="profile__information__form__remember">
                  <div className="profile__information__form__remember__container">
                    {notifications ? (
                      <BiCheckboxChecked
                        onClick={(): void => {
                          setNotifications(!notifications);
                        }}
                        className="profile__information__form__remember__container__check"
                      />
                    ) : (
                      <BiCheckbox
                        onClick={(): void => {
                          setNotifications(!notifications);
                        }}
                        className="profile__information__form__remember__container__check"
                      />
                    )}
                    <p className="profile__information__form__remember__container__text">
                      Deseo recibir noticias y promociones de la marca
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="profile__information__form__agreeTerms">
                  <div className="profile__information__form__agreeTerms__container">
                    {agreeTerms ? (
                      <BiCheckboxChecked
                        onClick={(): void => {
                          setAgreeTerms(!agreeTerms);
                        }}
                        className="profile__information__form__agreeTerms__container__check"
                      />
                    ) : (
                      <BiCheckbox
                        onClick={(): void => {
                          setAgreeTerms(!agreeTerms);
                        }}
                        className="profile__information__form__agreeTerms__container__check"
                      />
                    )}
                    <p className="profile__information__form__agreeTerms__container__text">
                      Estoy de acuerdo con términos y condiciones
                    </p>
                  </div>
                </div>
              </>
            )}

            <button className="profile__information__form__entersession" type="submit">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
