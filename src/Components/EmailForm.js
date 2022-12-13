import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";
import { SubscriptionForm } from "./SubscriptionForm";
const EmailForm = () => {
  const URL = `https://easy-rose-raven-vest.cyclic.app/`;
  const [email, setEmail] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [userId, setUserId] = useState("");
  const [toRegister, setToRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();

    axios.get(`${URL}/findUser?userId=${email}`, { Email: email }).then(
      (response) => {
        if (response.status === 210) {
          setToRegister(true);
          console.log(response);
        } else if (response.status === 201) {
          setUserFound(true);
          setUserId(response.data._id);
        }
      },
      (e) => {
        console.log(e);
      }
    );
  };
  const fromchild = (data) => {
    if (data === true) setRegisterSuccess(true);
  };
  const fetched_id = (data) => {
    setUserId(data);
  };
  return (
    <>
      {!userFound && !toRegister ? (
        <EmailFormContainer>
          <form onSubmit={submitHandler} class="registration-form">
            <p>
              <label className="label" for="emailid">
                <h2>Email</h2>
              </label>
              <input
                type="email"
                placeholder="Enter your Email Address"
                id="current_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
              />
            </p>
            <div className="btn">
              <button>Submit</button>
            </div>
          </form>
        </EmailFormContainer>
      ) : userFound ? (
        <SubscriptionForm userId={userId} />
      ) : !registerSuccess ? (
        <RegisterForm
          _id={fetched_id}
          registerSuccess={fromchild}
          email={email}
        />
      ) : (
        <SubscriptionForm userId={userId} />
      )}
    </>
  );
};

const EmailFormContainer = styled.div`
  border-radius:4px;
  background-color: white;
  .btn {
    display: flex;
    justify-content: center;
  }
  .label {
    padding-top: 3px;
  }
  .batch {
    font-size: 12px;
    margin: 5px 0px 0px 10px;
  }
  .error_msg {
    color: red;
    font-size: 12px;
  }
  .registration-form {
    width: 370px;
    height: 175px;
    text-align: left;
    box-sizing: border-box;
    margin: 0px 30px 0px 30px;
  }

  label {
    display: block;
    font-size: 17px;
    font-weight: bold;
  }

  p {
    margin-bottom: 15px;
  }

  input,
  select {
    width: 357px;
    font-size: 12px;
    padding: 5px;
  }

  span {
    display: block;
    padding: 5px 0 0 3px;
    color: #d63d0a;
    display: none;
  }
  button {
    height:30px;
    width:250px;
    }
  }
`;
export default EmailForm;
