import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastFunction } from "../../utils/helperFunction";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "email-validator";
import { googleSignInAuth, googleSignInProvider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/userSlice";
//end of import

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    try {
      e.preventDefault();
      const validationResult = inputValidation(input.email, input.password);
      if (validationResult == true) {
        //submit sign in form
        dispatch(userAction.loginStart());
        if (!showSignUp) {
          const res = await axios.post(`http://localhost:8000/auth/login`, {
            email: input.email,
            password: input.password,
          });
          //there're errors
          if (res.data.success == false) {
            dispatch(userAction.loginFail());
            return toastFunction("error", res.data.msg);
          }
          //form sign in submit success
          if (res.data.success) {
            dispatch(userAction.loginSuccess(res.data.user));
            return navigate("/");
          }
        } else {
          //submit sign up form
          const res = await axios.post(`http://localhost:8000/auth/signup`, {
            email: input.email,
            password: input.password,
          });
          if (res.data.success == false) {
            dispatch(userAction.loginFail());
            return toastFunction("error", res.data.msg);
          } else {
            setShowSignUp(false);
            toastFunction("success", "Sign Up Succeed");
          }
        }
      }
    } catch (error) {
      toastFunction("error", error.message);
      dispatch(userAction.loginFail());
    }
  };

  //function for sign in with google
  const signInWithGoogle = () => {
    dispatch(userAction.loginStart());
    signInWithPopup(googleSignInAuth, googleSignInProvider)
      .then(async (result) => {
        const res = await axios.post(`http://localhost:8000/auth/googleAuth`, {
          result,
        });
        if (res.data.success) {
          toastFunction("success", res.data.msg);
          dispatch(userAction.loginSuccess(res.data.user));
          navigate("/");
        } else {
          dispatch(userAction.loginFail());
          return toastFunction("error", res.data.msg);
        }
      })
      .catch((error) => {
        dispatch(userAction.loginFail());
        toastFunction("error", error.message);
      });
  };

  return (
    <>
      <Container>
        {!showSignUp ? (
          <FormContainer>
            <div className="div_for_auth">
              <div className="intro_div">
                <p>Welcome to Word Quest</p>
                <h1>Sign In</h1>
              </div>
              <div className="div_for_form">
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
                    <Button type="submit">Sign In</Button>
                  </form>
                </div>
                <ConnectionContainer>
                  <hr></hr> <span> or sign in with </span>
                  <hr></hr>
                </ConnectionContainer>

                <ModernSignInContainer>
                  <button type="light" onClick={signInWithGoogle}>
                    <img src="../public/Icons/google_logo.svg" />
                    <span>Google</span>
                  </button>
                </ModernSignInContainer>
                <p>
                  New to World Quest?{" "}
                  <a
                    onClick={() => {
                      setShowSignUp(true);
                    }}
                  >
                    Join Now
                  </a>
                </p>
              </div>
            </div>
          </FormContainer>
        ) : (
          <FormContainer>
            <div className="div_for_auth">
              <div className="intro_div">
                <p>Welcome to Word Quest</p>
                <h1>Sign Up</h1>
              </div>
              <div className="div_for_form">
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
                    <Button type="submit">Sign Up</Button>
                  </form>
                </div>
                <ConnectionContainer>
                  <hr></hr> <span> or sign up with </span>
                  <hr></hr>
                </ConnectionContainer>
                <ModernSignInContainer>
                  <button type="light" onClick={signInWithGoogle}>
                    <img src="../public/Icons/google_logo.svg" />
                    <span>Google</span>
                  </button>
                </ModernSignInContainer>
                <p>
                  Already on World Quest?{" "}
                  <a
                    onClick={() => {
                      setShowSignUp(false);
                    }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </FormContainer>
        )}
        <PicContainer>
          <img src="/Icons/logo_text.png" />
        </PicContainer>
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
  margin-left: 2px;
  background-color: #3a7ff9;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #3368d4;
  }
`;

//first div
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
//div for form/info
const FormContainer = styled.div`
  .div_for_auth {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
    padding-left: 100px;
    .div_for_form {
      width: 60%;
      padding-left: 100px;
      p {
        margin-left: 50px;
        font-size: 12px;
      }
      a {
        color: #3a7ff9;
        cursor: pointer;
        &:hover {
          color: #3368d4;
        }
      }
      .div_for_signin_input {
        width: 100%;
      }
    }
  }
`;

//div for background/pic/logo
const PicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 70px;
`;

//css for fieldset
const Fieldset = styled.fieldset`
  width: 100%;
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
    display: flex;
    width: 100%;
  }

  &:focus-within {
    border-color: #3a7ff9;
  }
  &:focus-within legend {
    color: #3a7ff9;
  }
`;
const ConnectionContainer = styled.div`
  min-width: 10%;
  width: 100%;
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

const ModernSignInContainer = styled.div`
  min-width: 10%;
  with: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  img {
    background-color: white;
    padding: 5px 5px;
    border-radius: 5px;
  }
  button {
    ${"" /* background-color: #4285f4; */}
    background-color: black;
    cursor: pointer;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 6px 8px;
    border-radius: 5px;
    &:hover {
      background-color: #333333;
    }
  }
`;

export default Login;
