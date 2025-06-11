import { useNavigate } from "react-router-dom";

import "../css/header.css";
import axios from "axios";
import { useState } from "react";

const Header = () => {
  const [onLoading, setOnLoading] = useState(false);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goMyPage = () => {
    navigate("/mypage");
  };

  const goChat = () => {
    navigate("/chat");
  };

  const goLogin = () => {
    navigate("/login");
  };

  const showLoading = () => {
    setOnLoading(true);
  };

  const hideLoading = () => {
    setOnLoading(false);
  };

  const Logout = async() => {
    showLoading();
    window.localStorage.removeItem("token");
    await axios.post("/api/user/logout", null, { withCredentials: true });
    hideLoading();
    navigate("/");
  }

  return (
    <>
      <div className={onLoading ? "loadingModal" : "endModal"}>
        <div className="spinner"></div>
      </div>
      <header>
        <div className="header-container">
          <nav className="header-nav">
            <div className="header-nav-item" onClick={goHome}>
              홈
            </div>
            <div className="header-divider"></div>
            <div className="header-nav-item" onClick={goMyPage}>
              마이 페이지
            </div>
            <div className="header-divider"></div>
            <div className="header-nav-item" onClick={goChat}>
              채팅
            </div>
            <div className="header-divider"></div>
            {window.localStorage.getItem("token") === null ?
              <div className="header-nav-item" onClick={goLogin}>
                로그인
              </div>
              :
              <div className="header-nav-item" onClick={Logout}>
                로그아웃
              </div>
            }
            {/* 추가 메뉴 항목들은 여기에 추가하면 됩니다 */}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
