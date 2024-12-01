import React, { useState } from "react";
import mainLogo from "../../../assets/mainLogo.png";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import { useRegisterMutation } from "../../../Store/feature/Auth_slice/AuthApi_Slice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const tempErrors = { email: "", userName: "", password: "" };

    // Email validation
    if (!email) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
      valid = false;
    }

    // UserName validation (optional but required if provided)
    if (userName && userName.length < 3) {
      tempErrors.userName = "Username must be at least 3 characters long";
      valid = false;
    }

    // Password validation
    if (!password) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // If validation passes, proceed with register logic
      const body = {
        email,
        userName,
        password,
      };
      try {
        const res = await registerUser(body)?.unwrap() as any;
        if (res.status === 201) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Registered Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
          setEmail("");
          setUserName("");
          setPassword("");
        }
      } catch (err: any) {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err?.data.message || "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
        <section className="flex justify-center items-center space-x-2 mb-4">
          <img src={mainLogo} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="font-bold text-black text-[20px] md:block hidden">
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

          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-medium text-sm mb-2"
            >
              Username (Optional)
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.userName ? "border-red-500" : "border-gray-300"
              } focus:ring-main_color shadow-md shadow-main_color/30`}
              placeholder="Enter your username"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-sm mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-main_color shadow-md shadow-main_color/30`}
              placeholder="Enter your password"
            />

            <div
              className="absolute right-2 top-12 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <CustomButton
            label="Register"
            variant="filled"
            type="submit"
            className="w-full"
            loading={isLoading}
          />
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-main_color hover:underline">
              Login
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
