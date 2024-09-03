import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastFunction } from "../../utilities/helperFunction";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "email-validator";
import {
  googleSignInAuth,
  googleSignInProvider,
} from "../../utilities/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });

  //input vaidation
  const inputValidation = (email, password) => {
    if (!email || !password) {
      return toastFunction("error", "Email or Password is missing");
    }
    const emailValidatorCheck = validator.validate(email);
    if (!emailValidatorCheck) {
      return toastFunction("error", "Email is incorrect");
    }
    if (password.length < 8) {
      return toastFunction("error", "Password needs 8 characters long");
    }
    return true;
  };

  //function for input Onchange
  const inputOnChangeFunction = (e, typeOfInput) => {
    if (typeOfInput == "email") {
      const inputCopy = { ...input, email: e.target.value };
      setInput(inputCopy);
    }
    if (typeOfInput == "password") {
      const inputCopy = { ...input, password: e.target.value };
      setInput(inputCopy);
    }
  };

  //function for submit the form
  const formSubmit = async (e) => {
    e.preventDefault();
    const validationResult = inputValidation(input.email, input.password);
    if (validationResult == true) {
      const res = await axios.post(`http://localhost:8000/auth/login`, {
        email: input.email,
        password: input.password,
      });
      if (res.data.success == false) {
        return toastFunction("error", res.data.msg);
      } else {
        navigate("/");
      }
    }
  };

  //function for sign in with google
  const signInWithGoogle = () => {
    signInWithPopup(googleSignInAuth, googleSignInProvider)
      .then(async (result) => {
        const res = await axios.post(`http://localhost:8000/auth/googleAuth`, {
          result,
        });
        if (res.data.success) {
          toastFunction("success", res.data.msg);
          navigate("/");
        } else {
          return toastFunction("error", res.data.msg);
        }
      })
      .catch((error) => toastFunction("error", error));
  };

  return (
    <>
      <Container>
        {!showSignUp ? (
          <FormContainer>
            <div className="div_for_traditional_signin">
              <p>Welcome to Word Quest</p>
              <h1>Sign In</h1>
              <div className="div_for_signin_input">
                <form onSubmit={formSubmit}>
                  <Fieldset>
                    <legend>Email</legend>
                    <input
                      type="text"
                      name="email"
                      value={input.email}
                      placeholder="example@gmail.com"
                      onChange={(e) => {
                        inputOnChangeFunction(e, "email");
                      }}
                    />
                  </Fieldset>
                  <Fieldset>
                    <legend>Password</legend>
                    <input
                      type="password"
                      value={input.password}
                      placeholder="********"
                      onChange={(event) => {
                        inputOnChangeFunction(event, "password");
                      }}
                    />
                  </Fieldset>
                  <Button className="formSubmitButton" type="submit">
                    Sign In
                  </Button>
                </form>
              </div>
            </div>
            <ConnectionContainer>
              <hr></hr> <span> or sign in with </span>
              <hr></hr>
            </ConnectionContainer>
            <div className="div_for_modern_sign_in">
              <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
          </FormContainer>
        ) : (
          <FormContainer>
            <div className="div_for_traditional_signin">
              <p>Welcome to Word Quest</p>
              <h1>Sign In</h1>
              <div className="div_for_signin_input">
                <form onSubmit={formSubmit}>
                  <Fieldset>
                    <legend>Email</legend>
                    <input
                      type="text"
                      name="email"
                      value={input.email}
                      placeholder="example@gmail.com"
                      onChange={(e) => {
                        inputOnChangeFunction(e, "email");
                      }}
                    />
                  </Fieldset>
                  <Fieldset>
                    <legend>Password</legend>
                    <input
                      type="password"
                      value={input.password}
                      placeholder="********"
                      onChange={(event) => {
                        inputOnChangeFunction(event, "password");
                      }}
                    />
                  </Fieldset>
                  <Button className="formSubmitButton" type="submit">
                    Sign In
                  </Button>
                </form>
              </div>
            </div>
            <div className="div_for_modern_sign_in"></div>
          </FormContainer>
        )}
        <PicContainer></PicContainer>
      </Container>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

//styled components for button
const Button = styled.button`
  min-width: 100%;
  background-color: #3a7ff9;
  color: white;
  border: none;
  padding: 10px;
`;

//first div
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//div for form/info
const FormContainer = styled.div``;

//div for background/pic/logo
const PicContainer = styled.div``;

//css for fieldset
const Fieldset = styled.fieldset`
  margin-bottom: 10px;
  transition: border-color ease 0.3s;
  legend {
    font-size: 13px;
    color: #757575;
    transition: color ease 0.3s;
  }
  input {
    border: none;
    outline: none;
  }

  &:focus-within {
    border-color: #3a7ff9;
  }
  &:focus-within legend {
    color: #3a7ff9;
  }
`;
const ConnectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 5px;
  hr {
    min-width: 30%;
  }
  span {
    font-size: 9px;
  }
`;

export default Login;
