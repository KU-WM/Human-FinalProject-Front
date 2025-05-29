import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/main";

const RootRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
};

export default RootRoutes;
