import { Outlet } from "react-router-dom";
import MainNavigationBar from "../components/RootLayOut/MainNavigationBar";

const RootLayout = () => {
  return (
    <>
      <MainNavigationBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
