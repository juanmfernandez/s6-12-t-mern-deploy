import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

type UserDirection = {
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: number;
  zipCode?: number;
};

const userInformationSchema = Yup.object().shape({
  country: Yup.string().required("País requerido"),
  state: Yup.string().required("Provincia requerida"),
  city: Yup.string().required("Barrio requerido"),
  street: Yup.string().required("Calle requerida"),
  number: Yup.number().required("Número de puerta requerido"),
  zipCode: Yup.number().required("Código Postal requerido")
});

export default function EditDirection({
  country,
  state,
  city,
  street,
  number,
  zipCode
}: UserDirection) {
  const USER__DIRECTION__VALUES__FORM: UserDirection = {
    country: country,
    state: state,
    city: city,
    street: street,
    number: number,
    zipCode: zipCode
  };
  return (
    <div className="profile__direction">
      <h1 className="profile__direction__title">DIRECCIÓN</h1>
      <Formik
        initialValues={USER__DIRECTION__VALUES__FORM}
        validationSchema={userInformationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="profile__direction__form">
            <label className="profile__direction__form__label" htmlFor="country">
              País
            </label>
            <Field className="profile__direction__form__field" name="country" placeholder="País" />
            {errors.country && touched.country ? (
              <div className="profile__direction__form__error">{errors.country}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="state">
              Departamento/Provincia
            </label>
            <Field
              className="profile__direction__form__field"
              name="state"
              placeholder="Provincia"
            />
            {errors.state && touched.state ? (
              <div className="profile__direction__form__error">{errors.state}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="city">
              Barrio
            </label>
            <Field className="profile__direction__form__field" name="city" placeholder="Barrio" />
            {errors.city && touched.city ? (
              <div className="profile__direction__form__error">{errors.city}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="street">
              Calle
            </label>
            <Field className="profile__direction__form__field" name="street" placeholder="Calle" />
            {errors.street && touched.street ? (
              <div className="profile__direction__form__error">{errors.street}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="number">
              Número de puerta
            </label>
            <Field
              className="profile__direction__form__field"
              name="number"
              placeholder="Número de puerta"
            />
            {errors.number && touched.number ? (
              <div className="profile__direction__form__error">{errors.number}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="zipCode">
              Código Postal
            </label>
            <Field
              className="profile__direction__form__field"
              name="zipCode"
              placeholder="Código Postal"
            />
            {errors.zipCode && touched.zipCode ? (
              <div className="profile__direction__form__error">{errors.zipCode}</div>
            ) : null}

            <button className="profile__direction__form__save" type="submit">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
