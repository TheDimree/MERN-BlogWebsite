import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);

    const handleUsername = (event) => {
      const usernameValue = event.target.value;
      setUsername(event.target.value)
      setErr(true)
      const pattern = /^[a-zA-Z0-9]+$/;   // always enclose the pattern in forward slashes.
      const patternValid = pattern.test(usernameValue);
      if (patternValid || usernameValue === '') {
        setErr(false)
      }
      else {
        setErr(true)
      }
    }
    const handlePassword = (event) => {
      const passwordValue = event.target.value;
      setPassword(passwordValue);  
    }

    // const login = () => {
    //     if(username.length >= 4 && password.length >= 5) {
    //      alert("logged in successfully")
    //     }
    // }
    
    const clearFormData = () => {
      setUsername("");
      setPassword("");
    };

    const checkLogin = async (event) =>  {
      event.preventDefault();
      if ( username !== "" && password !== "") {
        const formData = {  //* creating an object from all useStates
        username: username,
        password: password,
      };

      try {
        const response = await fetch("http://localhost:8008/signin", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const getRes = await response.json();
        console.log("Login:", getRes)
        if (getRes.success) {
          // Perform actions for successful login
          alert(getRes.msg);
        } else {
          // Perform actions for failed login
          alert(getRes.msg);
        }
        clearFormData();
      } 
      catch (error) {
        console.error("Error:", error);
      }
    }
    // clearFormData();
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" action="/signin" onSubmit={checkLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value = {username}
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleUsername}
                /> {err ? <span className="mt-10 text-center text-sm text-red-900">Alphanumeric is allowed only</span> : ''}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to='/otpinput'
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value= {password}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handlePassword}
                /> {err ? <span className="mt-10 text-center text-sm text-red-900">Invalid Password</span> : ''}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
