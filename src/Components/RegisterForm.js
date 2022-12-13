import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const RegisterForm = (props) => {
  const initialValues = {
    First_name: "",
    Last_name: "",
    DoB: "",
    Sex: "Male",
    Email: props.email,
    Contact: "",
  };
  const URL = `https://easy-rose-raven-vest.cyclic.app/`;
  let registerSuccess = false;
  let user_id = "";
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("");
    }
  }, [formErrors]);
  const SubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(ageValidator(formValues.DoB));
    setIsSubmit(true);
    {
      isSubmit &&
        axios.post(`${URL}/registerUser`, formValues).then(
          (response) => {
            if (response.status === 201) {
              console.log(response.data);
              props.registerSuccess(true);
              // console.log(response.data._id)
              props._id(response.data._id);
            }
          },
          (e) => {
            alert("User Already Exists");
            window.location.reload();
          }
        );
    }
  };
  const ageValidator = (DoB) => {
    const errors = {};
    var birthday = DoB;
    var regexVar = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    var userBirthDate = new Date(birthday.replace(regexVar, "$3-$2-$1"));
    var todayYear = new Date().getFullYear();
    var cutOff18 = new Date();
    cutOff18.setFullYear(todayYear - 18); // ...
    var cutOff65 = new Date();
    cutOff65.setFullYear(todayYear - 65);
    if (isNaN(userBirthDate)) {
      errors.DoB = "date of birth is invalid";
    } else if (userBirthDate > cutOff18) {
      errors.DoB = "you have to be older than 18";
    } else if (userBirthDate < cutOff65) {
      errors.DoB = "you have to be younger than 65";
    } else {
      errors.DoB = "";
    }
    return errors;
  };
  return (
    <RegisterFormContainer>
      <div className="form-header">
        <p>First Get Your self Registered</p>
      </div>
      <form onSubmit={SubmitHandler} class="registration-form">
        <p>
          <label for="name">Name</label>
          <div>
            <input
              type="text"
              placeholder="First Name"
              id="First_name"
              value={formValues.First_name}
              onChange={handleChange}
              name="First_name"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              id="Last_name"
              value={formValues.Last_name}
              onChange={handleChange}
              name="Last_name"
              required
            />
          </div>
        </p>
        <p class="birthday_date">
          <label for="birthday">Date of Birth</label>
          <input
            type="text"
            name="DoB"
            id="date"
            value={formValues.DoB}
            onChange={handleChange}
            required
            placeholder="Enter DOB in MM/DD/YYYY format"
          />
          <p className="error_msg">{formErrors.DoB}</p>
        </p>
        <p>
          <label for="gender">Gender</label>
          <select onChange={handleChange} name="Sex" class="dd">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <span id="gender_error">you can't leave this empty.</span>
        </p>
        <p>
          <label for="phone">Mobile phone</label>
          <input
            value={formValues.Contact}
            type="text"
            id="mobile_phone"
            name="Contact"
            onChange={handleChange}
            required
          />
        </p>
        <button>Register</button>
      </form>
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = styled.div`
  height: 67vh;
  border-radius: 4px;
  background-color: white;
  ${"" /* padding-top:10px */}
  .form-header {
    padding-top: 4px;
  }

  .batch-label {
    display: flex;
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
    box-sizing: border-box;
    margin-bottom: 50px;
  }

  label {
    margin-left: 26px;
    text-align: left;
    display: block;
    font-size: 17px;
    font-weight: bold;
  }

  p {
    margin-bottom: 15px;
  }

  input,
  select {
    width: 305px;
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
  }

  select {
    width: 319px;
  }

  #First_name,
  #Last_name {
    width: 140px;
  }

  #Last_name {
    margin-left: 10px;
  }

  input:focus {
  }

  span {
    display: block;
    padding: 5px 0 0 3px;
    color: #d63d0a;
    display: none;
  }
  button {
    height: 30px;
    width: 250px;
    color: white;
    background-color: #282c34;
    border-radius: 5px;
  }
`;
export default RegisterForm;
