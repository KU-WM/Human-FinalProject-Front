import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/main";
import MyPage from "../pages/myPage";
import LoginPage from "../pages/login";
import AdminPage from "../pages/admin";

const RootRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/chat" element={<Chatting />} /> */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default RootRoutes;
