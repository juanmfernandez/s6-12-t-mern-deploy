import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";

type ChangePasswords = {
  actualPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const changePasswordSchema = Yup.object().shape({
  actualPassword: Yup.string()
    .min(6, "Contraseña minimo 6 caracteres")
    .required("Contraseña requerida"),
  newPassword: Yup.string()
    .min(6, "Contraseña minimo 6 caracteres")
    .required("Contraseña requerida"),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Contraseñas deben coincidir")
    .required("Confirmación requerida")
});

export default function EditPassword() {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [seeNewPassword, setSeeNewPassword] = useState<boolean>(false);
  const CHANGE__PASSWORD__FORM__INITIAL__VALUES: ChangePasswords = {
    actualPassword: "",
    newPassword: "",
    newPasswordConfirm: ""
  };
  return (
    <div className="profile__password">
      <h1 className="profile__password__title">CAMBIAR CONTRASEÑA</h1>
      <Formik
        initialValues={CHANGE__PASSWORD__FORM__INITIAL__VALUES}
        validationSchema={changePasswordSchema}
        onSubmit={values => console.log(values)}
      >
        {({ errors, touched }) => (
          <Form className="profile__password__form">
            <label className="profile__password__form__label" htmlFor="actualPassword">
              Contraseña Actual
            </label>
            <div className="profile__password__form__container">
              <Field
                className="profile__password__form__container__field"
                name="actualPassword"
                placeholder="Contraseña Actual"
                type={seePassword ? "text" : "password"}
              />
              <FaEye
                onClick={(): void => {
                  setSeePassword(!seePassword);
                }}
                className="profile__password__form__container__icon"
              />
            </div>
            {errors.actualPassword && touched.actualPassword ? (
              <div className="profile__password__form__container__error">
                {errors.actualPassword}
              </div>
            ) : null}
            <label className="profile__password__form__label" htmlFor="newPassword">
              Nueva Contraseña
            </label>
            <div className="profile__password__form__container">
              <Field
                className="profile__password__form__container__field"
                name="newPassword"
                placeholder="Nueva Contraseña"
                type={seeNewPassword ? "text" : "password"}
              />
              <FaEye
                onClick={(): void => {
                  setSeeNewPassword(!seeNewPassword);
                }}
                className="profile__password__form__container__icon"
              />
            </div>
            {errors.newPassword && touched.newPassword ? (
              <div className="profile__password__form__container__error">{errors.newPassword}</div>
            ) : null}
            <label className="profile__password__form__label" htmlFor="newPasswordConfirm">
              Confirmar Contraseña
            </label>
            <div className="profile__password__form__container">
              <Field
                className="profile__password__form__container__field"
                name="newPasswordConfirm"
                placeholder="Confirmar Contraseña"
                type={seeNewPassword ? "text" : "password"}
              />
              <FaEye
                onClick={(): void => {
                  setSeeNewPassword(!seeNewPassword);
                }}
                className="profile__password__form__container__icon"
              />
            </div>
            {errors.newPasswordConfirm && touched.newPasswordConfirm ? (
              <div className="profile__password__form__container__error">
                {errors.newPasswordConfirm}
              </div>
            ) : null}
            s
            <button className="profile__password__button" type="submit">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
