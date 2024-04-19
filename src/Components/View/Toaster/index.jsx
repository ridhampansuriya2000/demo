import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from "./Toaster.module.css";
import {useDispatch, useSelector} from "react-redux";
import {loadToaster} from "../../../store/action/toaster";

let defaultProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
};

const Toaster = () => {

    const dispatch = useDispatch();

  const notify = () => {
      dispatch(loadToaster());
  };

  return (
      <div>
        {/*<button onClick={notify}>Notify!</button>*/}
        <ToastContainer />
      </div>
  );
};

export default Toaster;
