import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { useLogIn, useSignUpUser } from "../../hooks/useAuth";

import Button from "../Button/Button";
import classes from "./AuthFormFactory.module.css";
import { ClipLoader } from 'react-spinners';

const FormFactory = ({ fields, formType }) => {
  const location = useLocation();

  const {
    mutate: signUpMutate,
    isLoading: isSignUpLoading,
    isError: isSignUpError,
    error: signUpError,
  } = useSignUpUser();

  const {
    mutate: logInMutate,
    isLoading: isLogInLoading,
    isError: isLogInError,
    error: logInError,
  } = useLogIn();

  // Decide mutation de acordo com a rota
  const isLogin = location.pathname.includes("/login");

  const mutation = isLogin ? logInMutate : signUpMutate;
  const isLoading = isLogin ? isLogInLoading : isSignUpLoading;
  const isError = isLogin ? isLogInError : isSignUpError;
  const errorMutation = isLogin ? logInError : signUpError;

  // React Hook Form - define o schema com base no signUp / login
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: fields?.schema ? zodResolver(fields.schema) : undefined,
  });

  // Filtra entradas do objeto fields (tirando schema)
  const fieldsEntries = Object.entries(fields).filter(
    ([key]) => key !== "schema",
  );

  // OnSubmit
  const onSubmit = (data) => {
    mutation(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {fieldsEntries.map(([_key, field]) => {
        const error = errors[field.name]?.message;

        return (
          <div className={classes.formWrapper} key={field.name}>
            {field.label && (
              <label className={classes.label} htmlFor={field.htmlFor}>
                {field.label}
              </label>
            )}

            <input
              className={classes.input}
              type={field.type}
              {...register(field.name)}
            />

            {error && <p className={classes.error}>{error}</p>}
          </div>
        );
      })}

      {formType && (
        <>
          <div className={classes.buttonWrapper}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <ClipLoader size={20} color="#fff"/> : formType}
            </Button>
          </div>

          <div className={classes.response}>
            {isError && (
              <span className={classes.error}>{errorMutation.message}</span>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default FormFactory;
