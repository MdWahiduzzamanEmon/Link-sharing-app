import React, { useState } from "react";
import mainLogo from "../../../assets/mainLogo.png";
import CustomButton from "../../../Shared/CustomButton/CustomButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const tempErrors = { email: "", password: "" };

    // Email validation
    if (!email) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
      valid = false;
    }

    // Password validation
    if (!password) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // If validation passes, proceed with login logic
      console.log("Form Submitted", { email, password });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
        <section className="flex justify-center items-center space-x-2 mb-4">
          <img src={mainLogo} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="font-bold text-black text-[20px]  md:block hidden">
            devLinks
          </h1>
        </section>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium text-sm mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-main_color shadow-md shadow-main_color/30`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-sm mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-main_color shadow-md shadow-main_color/30`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <CustomButton
            label="Login"
            variant="filled"
            type="submit"
            className="w-full"
          />
        </form>

        {/* Register or Forgot Password Link (Optional) */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-main_color hover:underline">
              Register
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;