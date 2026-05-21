import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import AdminDashboard from "./pages/AdminDashboard";
import AllComponents from "./pages/AllComponents";
import MyComponents from "./pages/MyComponents";
import Pricing from "./pages/Pricing";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setAllUsers, setAllComponents } from "./redux/userSlice";

export const ServerURL = "https://devoraui.onrender.com";

const App = () => {

  const dispatch = useDispatch();
  const {userData, allUsers, allComponents} = useSelector(state=>state.user);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(()=>{

    const fetchUser = async ()=>{
      try {
        const res = await axios.get(`${ServerURL}/api/user/current-user`, {withCredentials: true});
        // console.log(res);
        dispatch(setUserData(res.data));
        setAuthChecked(true);
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
        setAuthChecked(true);
      }
    }

    fetchUser();
  }, [])

  useEffect(()=>{
    if(!userData) return;
    const fetchAllUser = async ()=>{
      try {
        const res = await axios.get(`${ServerURL}/api/user/all-users`, {withCredentials: true});
        // console.log(res);
        dispatch(setAllUsers(res.data));
      } catch (error) {
        console.log(error);
        dispatch(setAllUser(null));
      }
    }

    const fetchAllComponents = async () => {
      try {
        const res = await axios.get(`${ServerURL}/api/component/all-components`, {withCredentials: true});
        // console.log(res);
        dispatch(setAllComponents(res.data));
      } catch (error) {
        console.log(error);
        dispatch(setAllComponents(null));
      }
    }

    fetchAllComponents();
    fetchAllUser();

  }, [userData, dispatch]);

  return (
    <>
      {
        !authChecked && (
          <div className="fixed top-0 left-0 w-full h-1 bg-[rgba(59, 203, 255, 0.98)] animate-pulse z-50"></div>
        )
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/components" element={<AllComponents />} />
        <Route path="/my-components" element={<MyComponents />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </>
  );
};

export default App;