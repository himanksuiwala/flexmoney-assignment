import React, { useState } from "react";
import EmailForm from "../Components/EmailForm";
import RegisterForm from "../Components/RegisterForm";
import SubscriptionForm from "../Components/SubscriptionForm";

const Home = () => {
  const [userFound, setUserFound] = useState(false);
  const [userId, setUserId] = useState("");
  const [toRegister, setToRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const isFound = (data) => {
    if (data === true) setUserFound(true);
  };
  const fetchedId = (data) => {
    setUserId(data);
  };
  const fromchild = (data) => {
    if (data === true) setRegisterSuccess(true);
  };
  const fetchedEmail = (data) => {
    setEmail(data);
  };
  const registerStatus = (data) => {
    setToRegister(true);
  };
  return (
    <>
      {!userFound && !toRegister ? (
        <EmailForm
          ToRegister={registerStatus}
          userEmail={fetchedEmail}
          userFound={isFound}
          userId={fetchedId}
        />
      ) : userFound ? (
        <SubscriptionForm userId={userId} />
      ) : !registerSuccess ? (
        <RegisterForm
          _id={fetchedId}
          registerSuccess={fromchild}
          email={email}
        />
      ) : (
        <SubscriptionForm userId={userId} />
      )}
    </>
  );
};

export default Home;
