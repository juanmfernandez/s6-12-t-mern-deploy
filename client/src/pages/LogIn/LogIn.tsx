import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { loginUser } from "../../app/state/authSlice";
import { LoginValues } from "../../models/LoginValues";
import { Icons } from "../../assets/icons/icons";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

YupPassword(Yup);

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("Email requerido"),
  password: Yup.string().min(6, "Contraseña minimo 6 caracteres").required("Contraseña requerida")
});

export default function LogIn() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (values: LoginValues) => {
    const isLogin = (await dispatch(loginUser(values))) as { login: true; msg: string };
    if (isLogin.login) {
      toast.success(isLogin.msg, {
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
      toast.error(isLogin.msg, {
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

  const [remember, setRemember] = useState<boolean>(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const INITIAL__VALUES__LOGIN__FORM: LoginValues = {
    email: "",
    password: ""
  };
  return (
    <div className="container__login">
      <div className="login">
        <img className="login__title" src={Icons.Logo} alt="logo" />
        <h4 className="login__subtitle">Inicia sesión para ingresar tu cuenta</h4>
        <Formik
          initialValues={INITIAL__VALUES__LOGIN__FORM}
          validationSchema={loginSchema}
          onSubmit={values => handleLogin(values)}
        >
          {({ errors, touched }) => (
            <Form className="login__form">
              <Field className="login__form__field" name="email" placeholder="E-mail" />
              {errors.email && touched.email ? (
                <div className="login__form__error">{errors.email}</div>
              ) : null}

              <div className="login__form__password">
                <Field
                  className="login__form__password__field"
                  name="password"
                  placeholder="Contraseña"
                  type={seePassword ? "text" : "password"}
                />
                <FaEye
                  className="login__form__password__eye"
                  onClick={(): void => {
                    setSeePassword(!seePassword);
                  }}
                />
              </div>
              {errors.password && touched.password ? (
                <div className="login__form__error">{errors.password}</div>
              ) : null}

              <div className="login__form__remember">
                <div className="login__form__remember__container">
                  {remember ? (
                    <BiCheckboxChecked
                      className="login__form__remember__container__check"
                      onClick={(): void => {
                        setRemember(!remember);
                      }}
                    />
                  ) : (
                    <BiCheckbox
                      className="login__form__remember__container__check"
                      onClick={(): void => {
                        setRemember(!remember);
                      }}
                    />
                  )}
                  <p className="login__form__remember__container__text">Recordarme</p>
                </div>
              </div>

              <button className="login__form__entersession" type="submit">
                Iniciar Sesión
              </button>
              <button className="login__form__entergoogle" type="button">
                <FcGoogle className="login__form__entergoogle__logo" />
                <p className="login__form__entergoogle__text">Continuar con Google</p>
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="benefits">
        <h2 className="benefits__title">Regístrate</h2>
        <p className="benefits__paragraph">
          Todavía no te has registrado, no hay problema, puedes hacerlo cuando quieras.
        </p>
        <h3 className="benefits__subtitle">Te brinda beneficios únicos:</h3>
        <div className="benefits__list">
          <ul className="benefits__list__ul">
            <li className="benefits__list__ul__item">Agregar productos a la lista de deseados</li>
            <li className="benefits__list__ul__item">Guardar tus direcciones</li>
            <li className="benefits__list__ul__item">Valorar productos</li>
            <li className="benefits__list__ul__item">Te recordamos el carrito de compras</li>
            <li className="benefits__list__ul__item">Futuras compras más rápidas</li>
          </ul>
        </div>
        <Link to="/signup" className="benefits__linkregister">
          Regístrarse
        </Link>
      </div>
    </div>
  );
}
