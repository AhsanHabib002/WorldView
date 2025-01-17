import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { userLogin, setUser, googleLogin } = useAuth();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [error, setError] = useState("");
  const from = location.state || "/";
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setTimeout(() => {
          navigate(from);
        }, 2000);
        Swal.fire("Logged In", "Your Login is Successful.", "success");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("User not found. Please check your email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(`Login failed: ${error.message}`);
        }
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setTimeout(() => {
          navigate(from);
        }, 2000);
        Swal.fire("Logged In", "Your Login is Successful.", "success");
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <>
      <div className="max-w-[90rem] mx-auto">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="max-w-[450px] mx-auto py-[90px] px-2">
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <h2 className="text-center font-semibold text-2xl mb-4">
                Login Your Account
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button
                  onClick={() => setShow(!show)}
                  className="btn btn-xs absolute right-4 top-12"
                >
                  <FaEye></FaEye>
                </button>
                <label className="label">
                  <button className="label-text-alt link link-hover">
                    Forget password?
                  </button>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-black text-white">Login</button>
              </div>
            </form>
            <div className="px-8 w-full">
              <div className="divider"></div>
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full"
              >
                Login With Google
              </button>

              <div className="flex gap-2 mt-4 text-sm  mb-6">
                <p>Don't have an account?</p>
                <div className="font-semibold text-[#6980ff] ">
                  <Link to="/register">Register Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
