import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOASTIFY } from "./Constants";
import styled from "styled-components";
export default function Toastify(props) {
  const { isOpen, type, message } = props;
  const notify = () => {
    switch (type) {
      case TOASTIFY.SUCCESS:
        toast.success(message);
        break;
      case TOASTIFY.ERROR:
        toast.error(message);
        break;
      case TOASTIFY.WARNING:
        toast.warning(message);
        break;
      case TOASTIFY.INFO:
        toast.info(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      notify();
    }
  }, [isOpen, type, message]);

  return (
    <ToastWrapper>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ToastWrapper>
  );
}

const ToastWrapper = styled.div`
  .toast-success {
    background-color: #4caf50 !important;
  }

  .toast-error {
    background-color: #f44336 !important;
  }

  .toast-warning {
    background-color: #ff9800 !important;
  }

  .toast-info {
    background-color: #2196f3 !important;
  }
`;
