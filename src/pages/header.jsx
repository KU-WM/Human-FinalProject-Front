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

  const goLogin = () => {
    navigate("/login");
  };

  const goAdmin = () => {
    navigate("/admin");
  };

  const showLoading = () => {
    setOnLoading(true);
  };

  const hideLoading = () => {
    setOnLoading(false);
  };

  const Logout = async() => {
    showLoading();
    await axios.post("/api/user/logout", null, { withCredentials: true });
    window.localStorage.clear();
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
            {window.localStorage.getItem("isAdmin") !== null &&
              <>
                <div className="header-nav-item" onClick={goAdmin}>
                  관리자
                </div>
                <div className="header-divider"></div>
              </>
            }
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
