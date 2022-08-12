import * as yup from "yup";
import { useFormik } from "formik";

interface IFormValues {
  lineOne: string;
  lineTwo?: string;
  lineThree?: string;
  postcode: string;
  country: string;
}

export function useAddressForm() {
  const validationSchema = yup.object({
    lineOne: yup.string().required("Line one is required"),
    lineTwo: yup.string().notRequired(),
    lineThree: yup.string().notRequired(),
    postCode: yup.string().required("Postcode is required"),
    country: yup.string().required("Country is required"),
  });

  const form = useFormik<IFormValues>({
    initialValues: {
      lineOne: "",
      lineTwo: "",
      lineThree: "",
      postcode: "",
      country: "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });

  const {values, handleBlur, handleChange, isSubmitting, errors} = form

  function onSubmit(){
    console.log(values);
    
  }


  return {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    errors,
    onSubmit
  }
}
