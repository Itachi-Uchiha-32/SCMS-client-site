import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext/AuthContext";


const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const axiosInstance = useAxios(); 
  const navigate = useNavigate();

  const [firebaseError, setFirebaseError] = useState("");
  const [profile, setProfile] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
    try {
      const res = await axios.post(url, formData);
      setProfile(res.data.data.url);
    } catch (err) {
      console.log("Image upload error", err);
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    setFirebaseError("");

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // 1. Save to DB
      const userInfo = {
        uid: user.uid,
        name: name,
        email: email,
        photo: profile,
        role: "user",
        created_at: new Date().toISOString(),
        last_loggedIn: new Date().toISOString(),
      };

      await axiosInstance.post(`users`, userInfo);

      // 2. Update Firebase profile
      await updateUser({ displayName: name, photoURL: profile });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate("/dashboard");
    } catch (err) {
      setFirebaseError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImage}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full rounded-2xl">
            Register
          </button>

          {firebaseError && <p className="text-red-500 text-sm text-center">{firebaseError}</p>}
        </form>

        {/* Social Login */}
        <div className="mt-4">
          <SocialLogin />
        </div>

        {/* Link to Login */}
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
