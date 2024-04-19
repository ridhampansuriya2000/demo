import React from "react";
import style from "./UserUnActivity.module.css";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../Modal";
import Button from "../Button";
import {logOutUser} from "../../../store/action/authAction";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useRouter} from "next/router";

const eventList = ["touchstart", "mousedown", "click", "keydown"];

const UserUnActivity = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const [isUserUnActive, setUserUnActive] = React.useState(false);
  const inactivityTimerRef = React.useRef(null);

  function resetTimer() {
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(logoutUser, 600000); // 10 minutes (adjust as needed)
  }

  function logoutUser() {
    dispatch(logOutUser());
    setUserUnActive(true);
    console.log("User inactive for too long. Logging out...");
  }

  function addEventListeners() {
    eventList.forEach((eventType) => {
      document.addEventListener(eventType, resetTimer);
    });
  }

  function removeEventListeners() {
    eventList.forEach((eventType) => {
      document.removeEventListener(eventType, resetTimer);
    });
  }

  React.useEffect(() => {
    if (isLogin && !(process.env.ALLOW_UN_ACTIVE_USER_LOGIN == "true")) {
      addEventListeners();
      resetTimer();
    } else {
      removeEventListeners();
      clearTimeout(inactivityTimerRef.current); // Clear timer when user logs out
    }

    return () => {
      removeEventListeners();
      clearTimeout(inactivityTimerRef.current); // Clear timer when component unmounts
    };
  }, [isLogin]);

  return (
      <>
        {/* Render the logout alert only if 'isUserUnActive' is true */}
        {isUserUnActive && <div className={style.logOutAlertContainer}>
          <Modal
              title={'User UnActivity'}
              onClose={()=>setUserUnActive(false)}
              // hideCloseBtn={true}
              body={
                <div className={style.alertModalBody}>
                  <p>You have been inactive for a long time,</p>
                  <p> your session is about to expire.</p>
                  <div className={style.continueBtn}>
                    <Button
                        text='CLICK TO RENEW SESSION'
                        type='primary'
                        onClick={()=>{
                          router.push('/login');
                          setUserUnActive(false);
                        }}
                    />
                  </div>
                </div>
              }
          />
        </div>}
      </>
  );
};

export default UserUnActivity;
