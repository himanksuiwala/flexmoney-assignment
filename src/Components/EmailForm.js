import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import SubmitButton from "./SubmitButton";
const EmailForm = (props) => {
  const URL = `https://easy-rose-raven-vest.cyclic.app/`;
  const [email, setEmail] = useState("");
  let userFound = false;
  let userId = "";
  let userEmail = "";
  let ToRegister = false;
  const submitHandler = (e) => {
    e.preventDefault();
    axios.get(`${URL}/findUser?userId=${email}`, { Email: email }).then(
      //Checking if user exists or not
      (response) => {
        if (response.status === 210) {
          //User does not exists
          props.ToRegister(true);
          props.userFound(false);
          props.userEmail(email);
        } else if (response.status === 201) {
          //User exists
          props.userFound(true);
          props.userId(response.data._id);
        }
      },
      (e) => {
        console.log(e);
      }
    );
  };
  return (
    <>
      <EmailFormContainer>
        <p className="header">Welcome to GetFit Yoga Classes</p>
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
            <SubmitButton type={"Submit"} />
          </div>
        </form>
      </EmailFormContainer>
    </>
  );
};

const EmailFormContainer = styled.div`
  border-radius:4px;
  height:40vh;
  background-color: white;
  .header{
    padding-top:30px;
    font-weight:600;
  }
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
  
  }
`;
export default EmailForm;
