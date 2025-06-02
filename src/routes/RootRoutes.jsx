import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/main";
import MyPage from "../pages/myPage";

const RootRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default RootRoutes;
