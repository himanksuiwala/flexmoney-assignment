import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SubmitButton from "./SubmitButton";
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
  const [isValidAge, setIsValidAge] = useState(false);
  const [isMobileValidated, SetisMobileValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(ageValidator(formValues.DoB));
    validateForm();
    setIsSubmit(true);
    {
      isValidAge &&
        isMobileValidated &&
        axios.post(`${URL}/registerUser`, formValues).then(
          (response) => {
            if (response.status === 201) {
              props.registerSuccess(true);
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
  function validateNumber(input) {
    var re = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(input);
  }
  function validateForm(e) {
    if (!validateNumber(formValues.Contact)){ alert("Enter a valid Number"); }
    else SetisMobileValidated(true);
  }
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
      errors.DoB = "You have to be older than 18";
    } else if (userBirthDate < cutOff65) {
      errors.DoB = "You have to be younger than 65";
    } else {
      errors.DoB = "";
      setIsValidAge(true);
    }
    return errors;
  };
  return (
    <RegisterFormContainer>
      <div className="form-header">
        <p>First get your self registered</p>
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
            type="number"
            id="mobile_phone"
            name="Contact"
            onChange={handleChange}
            required
            maxlength="10"
            // pattern="[0-9]{10}"
          />
          <p className="error_msg">{formErrors.Contact}</p>
        </p>
        <SubmitButton type={"Register"} />
      </form>
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = styled.div`
  height: 67vh;
  border-radius: 4px;
  background-color: white;
  .form-header {
    padding-top: 4px;
    font-size: 20px;
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
`;
export default RegisterForm;
