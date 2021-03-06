import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';
import "./styles.css";

// const validate = values => {
//    const errors = {};
//    if (!values.firstName) {
//      errors.firstName = 'Required';
//    } else if (values.firstName.length > 15) {
//      errors.firstName = 'Must be 15 characters or less';
//    }
 
//    if (!values.lastName) {
//      errors.lastName = 'Required';
//    } else if (values.lastName.length > 20) {
//      errors.lastName = 'Must be 20 characters or less';
//    }
 
//    if (!values.email) {
//      errors.email = 'Required';
//    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//      errors.email = 'Invalid email address';
//    }
 
//    return errors;
//  };

// const SignupForm = () => {
//   const formik = useFormik({
//     initialValues: { 
//       email: "",
//       firstName: "",
//       lastName: ""
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string()
//         .max(15, 'Must be 15 characters or less')
//         .required('Required'),
//       lastName: Yup.string()
//         .max(20, 'Must be 20 characters or less')
//         .required('Required'),
//       email: Yup.string().email('Invalid email address').required('Required'),
//     }),
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     }
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="firstName">First Name</label>
//       <input 
//         id="firstName"
//         name="firstName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.firstName}
//       />
//       {formik.touched.firstName && formik.errors.firstName ? (
//          <div>{formik.errors.firstName}</div>
//        ) : null}
//       <label htmlFor="lastName">Last Name</label>
//       <input 
//         id="lastName"
//         name="lastName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.lastName}
//       />
//       {formik.touched.lastName && formik.errors.lastName ? (
//          <div>{formik.errors.lastName}</div>
//        ) : null}
//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.email}
//       />
//       {formik.touched.email && formik.errors.email ? (
//          <div>{formik.errors.email}</div>
//        ) : null}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

/* Use the Formik components instead */
 const MyTextInput = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <>
       <label htmlFor={props.id || props.name}>{label}</label>
       <input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </>
   );
 };

 const MyCheckbox = ({ children, ...props }) => {
   const [field, meta] = useField({ ...props, type: "checkbox" });
   return (
     <div>
       <label className="checkbox">
         <input type="checkbox" {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };

const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div>
       <label htmlFor={props.id || props.name}>{label}</label>
       <select {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };
 
const SignupForm = () => {
   return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        acceptedTerms: Yup.boolean()
          .required('Required')
          .oneOf([true], 'You must accept the terms and conditions.'),
        jobType: Yup.string()
          .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid Job Type'
          )
          .required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <MyTextInput 
          label="First Name" 
          name="firstName"
          type="text"
          placeholder="Kevin" 
        />
        <MyTextInput 
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Zhang"
        />
        <MyTextInput 
          label="Email"
          name="email"
          type="email"
          placeholder="kevin@gmail.com"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
   );
 };

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
