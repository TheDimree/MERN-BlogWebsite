import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);

  const [username, setUsername] = useState("");
  const [errUsername, setErrUsername] = useState(false);

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [errPhone, setErrPhone] = useState(false);

  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState(false);

  const handleName = (event) => {
    const pattern = /^[a-zA-Z ]+$/;  // always enclose the pattern in forward slashes.
    const nameValue = event.target.value;
    setErrName(true)
    setName(nameValue)
    const patternValid = pattern.test(nameValue);
    if (patternValid || nameValue === '') {
      setErrName(false);
    }
  };

  const handleUsername = (event) => {
    const usernameValue = event.target.value;
    setErrUsername(true)
    setUsername(usernameValue)
    const pattern = /^[a-zA-Z0-9]+$/;   // always enclose the pattern in forward slashes.
    const patternValid = pattern.test(usernameValue);
    if (patternValid || usernameValue === '') {
      setErrUsername(false);
    }
  };

  const handlePassword = (event) => {
    // if(event.target.value.length>=5) // comparison operator doesn't work on String. Directly check useState.
    const passwordValue = event.target.value; // State is updating late so using this variable.
    setErrPassword(true);
    setPassword(passwordValue);      
    if (passwordValue.length > 4 || passwordValue === '')
      setErrPassword(false);
  }

  const handleConfirmPassword = (event) => {
    const confirmPasswordValue = event.target.value;
    setErrConfirmPassword(true)
    setConfirmPassword(confirmPasswordValue);
    if (confirmPasswordValue === password) {
      setErrConfirmPassword(false);
    } else if (confirmPasswordValue === "") {
      setErrConfirmPassword(false);
    }
  }

  const handleEmail = (event) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // always enclose the pattern in forward slashes. 
    const emailValue = event.target.value;
    setErrEmail(true)
    setEmail(emailValue);
    const patternValid = pattern.test(emailValue);
    if (patternValid) {
      setErrEmail(false);
    } else if (emailValue === "") {
      setErrEmail(false);
    }
  };

  const handlePhone = (event) => {
    const phoneValue= event.target.value;
    setPhone(phoneValue);
    const pattern = /^[0-9]*$/; // always enclose the pattern in forward slashes.
    const patternValid = pattern.test(phoneValue) && phoneValue.length === 10;
    if (patternValid || phoneValue === "") {
      setErrPhone(false);
    } else {
      setErrPhone(true);
    }
  };

  const clearFormData = () => {
    setName("");
    setErrName(false);
    setUsername("");
    setErrUsername(false);
    setEmail("");
    setErrEmail(false);
    setPhone("");
    setErrPhone(false);
    setPassword("");
    setErrPassword(false);
    setConfirmPassword("");
    setErrConfirmPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( name !== "" && username !== "" && email !== "" && phone !== "" && password !== "") {
      const formData = {  //* creating an object from all useStates
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: password,
      };

      try {
        const response = await fetch("http://localhost:8008/signup", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const msg = await response.json();
        console.log("Response from backend:", msg)
        clearFormData();
      } 
      catch (error) {
        console.error("Error:", error);
      }
    }
    clearFormData();
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
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            method="POST"
            action="/signup"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={name}
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="First and last name"
                  onChange={handleName}
                />{" "}
                {errName ? (
                  <span className="mt-10 text-center text-sm text-red-900">
                    Only alphabets are allowed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
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
                  value={username}
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter username"
                  onChange={handleUsername}
                />{" "}
                {errUsername ? (
                  <span className="mt-10 text-center text-sm text-red-900">
                    Only alphabets and Numbers are allowed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleEmail}
                />{" "}
                {errEmail ? (
                  <span className="mt-10 text-center text-sm text-red-900">
                    Invalid email
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  value={phone}
                  type="text"
                  autoComplete="phone"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handlePhone}
                />{" "}
                {errPhone ? (
                  <span className="mt-10 text-center text-sm text-red-900">
                    Invalid mobile number
                  </span>
                ) : (
                  ""
                )}
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handlePassword}
                />{" "}
                {errPassword ? (
                  <span className="mt-10 text-center text-sm text-red-900">
                    Password must be atleast 5 characters.
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleConfirmPassword}
                />{" "}
                {errConfirmPassword ? (
                  <span className="mt-10 text-center text-sm text-red-900">
                    Password does not match
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
