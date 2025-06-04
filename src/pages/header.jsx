import { useNavigate } from "react-router-dom";

import "../css/header.css";

const Header = () => {
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

  return (
    <>
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
            {/* 추가 메뉴 항목들은 여기에 추가하면 됩니다 */}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
