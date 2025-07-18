import { useEffect, useState } from "react";
import Error from "./error";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import * as Yup from "yup";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line
  }, [error, data]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) error.inner.forEach((err) => { newErrors[err.path] = err.message; });
      else { newErrors.api = error.message; }
      setErrors(newErrors);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start pt-24 pb-10 font-sans bg-background overflow-hidden">
      {/* Animated glassy background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute w-full h-full bg-gradient-to-tr from-indigo-900/70 via-fuchsia-900/40 to-sky-700/60 animate-gradient-slow blur-2xl" />
        <div className="absolute left-1/3 top-1/2 w-96 h-96 -translate-x-1/2 bg-pink-400/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      </div>
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6 border border-primary/20 bg-white/10 dark:bg-neutral-900/30 backdrop-blur-xl ring-1">
        <CardHeader className="mb-2">
          <CardTitle className="text-3xl font-bold mb-1">Sign up</CardTitle>
          <CardDescription className="mb-2">Create your account and get started</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSignup(); }}>
            <div>
              <Input name="name" type="text" autoComplete="name" placeholder="Full name"
                onChange={handleInputChange} value={formData.name} />
              {errors.name && <Error message={errors.name} />}
            </div>
            <div>
              <Input name="email" type="email" autoComplete="email" placeholder="Email address"
                onChange={handleInputChange} value={formData.email} />
              {errors.email && <Error message={errors.email} />}
            </div>
            <div>
              <Input name="password" type="password" autoComplete="new-password" placeholder="Set password"
                onChange={handleInputChange} value={formData.password} />
              {errors.password && <Error message={errors.password} />}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic" className="font-medium text-base text-foreground mb-1">
                Upload profile picture
              </label>
              <input
                id="profile_pic"
                name="profile_pic"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="file:rounded-xl file:p-2 file:border-border file:cursor-pointer w-full text-primary/90"
              />
              {errors.profile_pic && <Error message={errors.profile_pic} />}
            </div>
            <Button type="submit" variant="default" size="default" className="w-full mt-2 group" disabled={loading}>
              <span className="relative z-10">{loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}</span>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mt-2 flex justify-center">
          <span className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link className="text-primary hover:underline font-semibold" to="/auth">
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
