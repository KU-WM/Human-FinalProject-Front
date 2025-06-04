import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/main";
import MyPage from "../pages/myPage";
import Chatting from "../pages/chatting";

const RootRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chat" element={<Chatting />} />
      </Routes>
    </>
  );
};

export default RootRoutes;
