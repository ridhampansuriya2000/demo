import React from 'react'
import Loader from '../../_components/view/Loader/Loader'
import UserUnActivity from "../../_components/view/UserUnActivity";
import Socket from "../../Socket";
import Toaster from "../../_components/view/Toaster";

const Tools = () => {
  return (
    <>
    <Loader />
    <UserUnActivity />
    <Socket />
    <Toaster />
    </>
  )
}

export default Tools