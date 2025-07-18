import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./error";
import { login } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";

const Login = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { loading, error, fn: fnLogin, data } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line
  }, [error, data]);

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start pt-24 pb-10 font-sans bg-background overflow-hidden">
      {/* Animated glassy background - global */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute w-full h-full bg-gradient-to-tr from-sky-800/90 via-purple-900/40 to-sky-700/60 animate-gradient-slow blur-2xl" />
        <div className="absolute left-1/3 top-1/2 w-96 h-80 -translate-x-1/2 bg-indigo-400/30 rounded-full blur-3xl opacity-25 animate-pulse-slow" />
      </div>
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6 border border-primary/20 bg-white/10 dark:bg-neutral-900/30 backdrop-blur-xl ring-1 ring-inset ring-indigo-600/20 animate-fadein">
        <CardHeader className="mb-2">
          <CardTitle className="text-3xl font-bold mb-1">Login</CardTitle>
          <CardDescription className="mb-2">
            Sign in to your account to continue
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
            <div>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                onChange={handleInputChange}
                value={formData.email}
              />
              {errors.email && <Error message={errors.email} />}
            </div>
            <div>
              <Input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                onChange={handleInputChange}
                value={formData.password}
              />
              {errors.password && <Error message={errors.password} />}
            </div>
            <Button
              type="submit"
              className="mt-2 w-full group"
              variant="default"
              size="default"
              disabled={loading}
            >
              <span className="relative z-10">{loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}</span>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mt-2 flex justify-center">
          <span className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Link className="text-primary hover:underline font-semibold" to="/signup">
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
