import React from "react";
import styled, { keyframes } from "styled-components";
import Logo from "../assets/logo.png";
const LoadingW = ({ isOpen }) => {
  return (
    <LoadingContainer style={{ display: isOpen ? "flex" : "none" }}>
      <SpinnerContainer>
        <Spinner />
        <img src={Logo} alt="logo" />
      </SpinnerContainer>
    </LoadingContainer>
  );
};

export default LoadingW;

const spin = keyframes`
    to {
    transform: rotate(360deg);
  }`;
const LoadingContainer = styled.div`
  position: fixed;
  height: 120%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Spinner = styled.div`
  position: absolute;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0093d9;

  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 10px;
`;
