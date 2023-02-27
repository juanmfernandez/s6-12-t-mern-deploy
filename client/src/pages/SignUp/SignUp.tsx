import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { FaEye } from "react-icons/fa";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { Icons } from "../../assets/icons/icons";
import { SignUpValues } from "../../models/SignUpValues";
import { signUpUser } from "../../app/state/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

YupPassword(Yup);

type SignUpFormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Nombre minimo 3 caracteres")
    .max(20, "Nombre maximo 20 caracteres")
    .required("Nombre requerido"),
  lastName: Yup.string()
    .min(3, "Apellido minimo 3 caracteres")
    .max(20, "Apellido maximo 20 caracteres")
    .required("Apellido requerido"),
  email: Yup.string().email("Email invalido").required("Email requerido"),
  password: Yup.string()
    .required("Contraseña requerida")
    .min(8, "Contraseña minimo 8 caracteres")
    .minLowercase(1, "Contraseña debe contener minimo 1 caracter minuscula")
    .minUppercase(1, "Contraseña debe contener minimo 1 caracter mayuscula")
    .minNumbers(1, "Contraseña debe contener minimo 1 caracter numerico")
    .minSymbols(1, "Contraseña debe contener minimo 1 caracter simbolo"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Contraseñas deben coincidir")
    .required("Confirmación requerida")
});

export default function SignUp() {
  const [remember, setRemember] = useState<boolean>(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const INITIAL__VALUES__SIGNUP__FORM: SignUpFormValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const handleSignUp = async (values: SignUpValues) => {
    const request = await dispatch(signUpUser(values));
    if (request) {
      toast.success("Usuario Registrado con éxito!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error(request, {
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

  return (
    <div className="container__signup">
      <div className="signup">
        <img className="signup__title" src={Icons.Logo} alt="logo" />
        <h4 className="signup__subtitle">Ingresa tus datos para registrarte</h4>
        <Formik
          initialValues={INITIAL__VALUES__SIGNUP__FORM}
          validationSchema={signUpSchema}
          onSubmit={values => {
            let form: SignUpValues = {
              name: values.name,
              lastName: values.lastName,
              email: values.email,
              password: values.password
            };
            handleSignUp(form);
          }}
        >
          {({ errors, touched }) => (
            <Form className="signup__form">
              <Field className="signup__form__field" name="name" placeholder="Nombre" />
              {errors.name && touched.name ? (
                <div className="signup__form__error">{errors.name}</div>
              ) : null}

              <Field className="signup__form__field" name="lastName" placeholder="Apellido" />
              {errors.lastName && touched.lastName ? (
                <div className="signup__form__error">{errors.lastName}</div>
              ) : null}

              <Field className="signup__form__field" name="email" placeholder="E-mail" />
              {errors.email && touched.email ? (
                <div className="signup__form__error">{errors.email}</div>
              ) : null}

              <div className="signup__form__password">
                <Field
                  className="signup__form__password__field"
                  name="password"
                  placeholder="Contraseña"
                  type={seePassword ? "text" : "password"}
                />
                <FaEye
                  className="signup__form__password__eye"
                  onClick={(): void => {
                    setSeePassword(!seePassword);
                  }}
                />
              </div>
              {errors.password && touched.password ? (
                <div className="signup__form__error">{errors.password}</div>
              ) : null}

              <div className="signup__form__password">
                <Field
                  className="signup__form__password__field"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  type={seePassword ? "text" : "password"}
                />
                <FaEye
                  className="signup__form__password__eye"
                  onClick={(): void => {
                    setSeePassword(!seePassword);
                  }}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="signup__form__error">{errors.confirmPassword}</div>
              ) : null}

              <div className="signup__form__remember">
                <div className="signup__form__remember__container">
                  {remember ? (
                    <BiCheckboxChecked
                      className="signup__form__remember__container__check"
                      onClick={(): void => {
                        setRemember(!remember);
                      }}
                    />
                  ) : (
                    <BiCheckbox
                      className="signup__form__remember__container__check"
                      onClick={(): void => {
                        setRemember(!remember);
                      }}
                    />
                  )}
                  <p className="signup__form__remember__container__text">
                    Deseo recibir noticias y promociones de la marca
                  </p>
                </div>
              </div>

              <button className="signup__form__entersession" type="submit">
                Registrarme
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="benefits">
        <div className="benefits__signup">
          <h2 className="benefits__signup__title">Tu nueva cuenta</h2>
          <h3 className="benefits__signup__subtitle">Te brinda beneficios únicos:</h3>
          <div className="benefits__signup__list">
            <ul className="benefits__signup__list__ul">
              <li className="benefits__signup__list__ul__item">
                Agregar productos a la lista de deseados
              </li>
              <li className="benefits__signup__list__ul__item">Guardar tus direcciones</li>
              <li className="benefits__signup__list__ul__item">Valorar productos</li>
              <li className="benefits__signup__list__ul__item">
                Te recordamos el carrito de compras
              </li>
              <li className="benefits__signup__list__ul__item">Futuras compras más rápidas</li>
            </ul>
          </div>
        </div>

        <div className="linklogin">
          <h2 className="linklogin__title">Inicia Sesión</h2>
          <p className="linklogin__paragraph">Si ya tienes cuenta puedes iniciar sesión</p>
          <Link to="/login" className="linklogin__button">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
