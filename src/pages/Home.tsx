import React, { useState } from "react";
import { auth } from "../firebase";
import LockIcon from "@material-ui/icons/Lock";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyPage from "../components/MyPage";

const Home: React.FC = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default Home;
