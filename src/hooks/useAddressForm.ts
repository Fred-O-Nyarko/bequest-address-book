import * as yup from "yup";
import { getIn, useFormik } from "formik";
import { IAddress } from "../shared/types";

export const initialValues: IAddress = {
  lineOne: "",
  lineTwo: "",
  lineThree: "",
  postCode: "",
  country: "",
  town: "",
};

export function useAddressForm() {
  const validationSchema = yup.object({
    lineOne: yup.string().required("Line one is required"),
    lineTwo: yup.string().notRequired(),
    lineThree: yup.string().notRequired(),
    town: yup.string().required("Town is required"),
    postCode: yup.string().required("Postcode is required"),
    country: yup.string().required("Country is required"),
  });

  const form = useFormik<IAddress>({
    initialValues: initialValues,
    validationSchema,
    onSubmit: onSubmit,
  });

  const {
    values,
    handleBlur,
    handleChange,
    isSubmitting,
    errors,
    setFieldValue,
    touched,
    resetForm,
  } = form;

  function getError(key: string) {
    const _touched = getIn(touched, key);
    const error = getIn(errors, key);
    return _touched && error ? error : undefined;
  }

  function onSubmit() {
    console.log(values);
  }

  return {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    errors,
    onSubmit,
    setFieldValue,
    getError,
    resetForm,
  };
}
