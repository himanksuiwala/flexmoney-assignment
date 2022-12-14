import React from "react";
import styled from "styled-components";

const SubmitButton = (props) => {
  return (
    <Button>
      <button type='submit' >{props.type}</button>
    </Button>
  );
};

const Button = styled.div`
  button {
    height: 45px;
    width: 270px;
    color: white;
    background-color: #282c34;
    border-radius: 5px;
  }
`;

export default SubmitButton;
