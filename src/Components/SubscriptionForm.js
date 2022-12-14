import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import SubmitButton from "./SubmitButton";
export default function SubscriptionForm(props) {
  const initialValues = {
    Customer_Id: props.userId,
    Batch_Id: "",
    Subscription_strt: "",
    Subscription_valid_till: "",
    Mode_of_payment: "",
    Fees: 500,
  };
  const URL = `https://easy-rose-raven-vest.cyclic.app/`;
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.Subscription_strt)
      errors.Subscription_strt = "Date is required";
    if (!values.Batch_Id) errors.Batch_Id = "Selection of Batch is required!";
    if (!values.Mode_of_payment)
      errors.Mode_of_payment = "Choose any of Mode of Payment";
    return errors;
  };

  const CompeletePayment = (e) => {
    //Complete payment handler which will pop-up upon succesfull payment
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    {
      isSubmit &&
        axios.post(`${URL}/subscribe`, formValues).then(
          (response) => {
            if (response.status === 201) {
              alert("Payment Successful. You've succesfully enrolled");
              window.location.reload();
            }
          },
          (e) => {
            console.log(e);
          }
        );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  var subscription_strt_date = new Date(formValues.Subscription_strt);
  var subscription_end_date = new Date(
    subscription_strt_date.getFullYear(),
    subscription_strt_date.getMonth() + 1,
    0
  );
  formValues.Subscription_valid_till = subscription_end_date;
  return (
    <Container>
      <form onSubmit={CompeletePayment} class="registration-form">
        <p>
          <div className="batch-label">
            <label for="gender">Batch</label>
            <p className="batch">Choose the most suitable batch</p>
          </div>
          <select onChange={handleChange} name="Batch_Id" class="dd">
            <option defaultChecked value="dummy">
              Choose a batch
            </option>
            <option value="6395959e7470b992539dff43">
              Batch-1 : 6-7AM - Mr. Ram
            </option>
            <option value="639595c67470b992539dff45">
              Batch-2 : 7-8AM - Mr. Shyam
            </option>
            <option value="639595e97470b992539dff47">
              Batch-3 : 8-9AM - Mr. Raj
            </option>
            <option value="639595ff7470b992539dff49">
              Batch-4 : 5-6PM - Mr. Kumar
            </option>
          </select>
          <p className="err">{formErrors.Batch_Id}</p>
        </p>
        <p>
          <label for="DoJ">Date of Joining</label>
          <input
            type="text"
            name="Subscription_strt"
            id="date"
            value={formValues.Subscription_strt}
            onChange={handleChange}
            required
            placeholder="Enter Date in MM/DD/YYYY format"
          />
          <p className="err">{formErrors.Batch_Id}</p>
          <p className="error_msg">
            <i>
              Your Subscription will be valid till :{" "}
              {subscription_end_date.toDateString()}
            </i>
          </p>
        </p>
        <p>
          <label for="Payment">Mode of Payment</label>
          <select onChange={handleChange} name="Mode_of_payment" class="dd">
            <option defaultChecked value="dummy">
              Choose a payment method
            </option>
            <option value="UPI">UPI</option>
            <option value="Credit/Debit Card">Credit/Debit Card</option>
            <option value="Paytm">Paytm</option>
          </select>
        </p>
        <p className="err">
          {" "}
          <p>{formErrors.Mode_of_payment}</p>
        </p>
        <p>
          <label for="Fees">Fees</label>
          <input
            type="number"
            name="Mode_of_payment"
            id="payment"
            required
            value="500"
          />
        </p>
        <div className="btn">
          <SubmitButton type={"Pay Now"} />
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  height:67vh;
  border-radius:4px;
  padding-top:5px;
  background-color: white;
  .batch-label{
    padding-top:17px;
  }
  .err{
    font-size:7px;
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
    margin: 5px 0px 0px 00px;
  }
  .error_msg {
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
