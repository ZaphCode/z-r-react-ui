import { SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { authFormSchema, AuthFormSchemaType } from "../../utils/schemas";
import { useAuthStore } from "../../stores/auth";
import { signinAPICall } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import OAuthButtons from "./components/OAuthButtons";
import { AccountIcon, KeyIcon, UserIcon } from "../../components/icons";
import AuthInput from "./components/AuthInput";
import { NavbarTitle } from "../../components/Navbar";

const Auth = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<AuthFormSchemaType>({
    resolver: zodResolver(authFormSchema),
  });

  const [isSignupMode, setIsSignupMode] = useState(false);
  const navigate = useNavigate();
  const signin = useAuthStore((store) => store.signin);

  const onSubmit: SubmitHandler<AuthFormSchemaType> = async (data) => {
    alert(data.email + " " + data.password);
    const [resp, err] = await signinAPICall(data, isSignupMode);

    if (err) return toast.error(err.message);

    signin(resp.user);

    toast.success("Success!");

    setTimeout(() => navigate("/"), 1000);
  };

  const onError: SubmitErrorHandler<AuthFormSchemaType> = (data) => {
    if (data.email?.message) toast.error(data.email.message);
    if (data.password?.message) toast.error(data.password.message);
    if (data.username?.message) toast.error(data.username.message);
  };

  const handleSignupButton = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSignupMode(!isSignupMode);
    resetField("username");
  };

  return (
    <>
      <div className="flex justify-center pt-5 mt-5">
        <NavbarTitle small={false} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex gap-3 items-center text-center py-8 mt-3 flex-col w-3/4 sm:max-w-lg md:max-w-xl mx-auto"
      >
        <h3 className="pfont font-bold text-neutral-800 tracking-wider text-4xl">
          Welcome back!
        </h3>
        <p className="pfont text-neutral-600">
          {isSignupMode
            ? "I already have an account. "
            : "Don't have an account yet? "}
          <button
            className="text-neutral-700 underline font-semibold"
            onClick={handleSignupButton}
          >
            {isSignupMode ? "Sign in" : "Sign up"}
          </button>
        </p>
        {isSignupMode && (
          <AuthInput
            name="username"
            registerData={register("username")}
            icon={<UserIcon />}
            af
            ph="John Doe"
            type="text"
          />
        )}
        <AuthInput
          name="email"
          registerData={register("email")}
          icon={<AccountIcon />}
          af
          ph="abc@test.mx"
          type="email"
        />
        <AuthInput
          name="password"
          registerData={register("password")}
          icon={<KeyIcon />}
          ph="password"
          type="password"
        />
        <button
          disabled={isSubmitting}
          className="w-3/4 bg-neutral-700 text-white p-3 mt-1 pfont font-semibold"
        >
          Submit
        </button>
        <OAuthButtons />
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </>
  );
};

export default Auth;
