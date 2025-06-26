import { useEffect, useState } from "react";
import refreshApi from "../component/refreshApi";
import "../css/admin.css"
import Users from "./admin_sub/users";
import Images from "./admin_sub/images";
import Logs from "./admin_sub/logs";
import Statistics from "./admin_sub/statistic";
import TempImages from "./admin_sub/tempImage";
import ReactDOM from "react-dom"

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [onLoading, setOnLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const res = async() => {
      await refreshApi.get("/user/isAdmin")
        .then((res) => {
          console.log("res", res);
          setIsAuthorized(true);
        })
        .catch((error) => {
          console.log("error", error);
          if(error.response.status === 403) {
            alert("접근 권한이 없습니다.");
            window.location.href = "/";
          }
        })
    }
    
    res();
  }, [])

  const menuItems = [
    { id: 'logs', title: '로그', icon: '📋', description: '시스템 로그를 확인합니다' },
    { id: 'statistics', title: '통계', icon: '📊', description: '사용자 및 시스템 통계를 확인합니다' },
    { id: 'users', title: '유저', icon: '👤', description: '모든 사용자를 관리합니다' },
    { id: 'images', title: '생성된 이미지', icon: '🖼️', description: '모든 생성된 이미지를 관리합니다' },
    { id: 'tempimages', title: '생성된 임시 이미지', icon: '🖼️', description: '모든 생성된 임시 이미지를 관리합니다' }
  ];

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
  };

  const handleBackToMenu = () => {
    setSelectedMenu(null);
  };

  const renderMenuGrid = () => (
    <div className="admin-menu-grid">
      {menuItems.map((item) => (
        <div 
          key={item.id}
          className="admin-menu-card"
          onClick={() => handleMenuClick(item.id)}
        >
          <div className="admin-menu-icon">{item.icon}</div>
          <h3 className="admin-menu-title">{item.title}</h3>
          <p className="admin-menu-description">{item.description}</p>
        </div>
      ))}
    </div>
  );

  const renderMenuHeader = () => (
    <div className="admin-menu-header">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`admin-menu-header-btn ${selectedMenu === item.id ? 'active' : ''}`}
          onClick={() => handleMenuClick(item.id)}
        >
          <span className="admin-menu-header-icon">{item.icon}</span>
          <span className="admin-menu-header-text">{item.title}</span>
        </button>
      ))}
    </div>
  );

  const renderContent = () => {
    switch(selectedMenu) {
      case 'logs':
        return (
          <div className="admin-content">
            <h2 className="admin-content-title">📋 시스템 로그</h2>
            <div className="admin-content-body">
              <Logs />
            </div>
          </div>
        );
      case 'statistics':
        return (
          <div className="admin-content">
            <h2 className="admin-content-title">📊 통계</h2>
            <div className="admin-content-body">
              <Statistics />
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="admin-content">
            <h2 className="admin-content-title">👤 유저</h2>
            <div className="admin-content-body">
              <Users />
            </div>
          </div>
        );
      case 'images':
        return (
          <div className="admin-content">
            <h2 className="admin-content-title">🖼️ 생성된 이미지</h2>
            <div className="admin-content-body">
              <Images />
            </div>
          </div>
        );
      case 'tempimages':
        return (
          <div className="admin-content">
            <h2 className="admin-content-title">🖼️ 생성된 임시 이미지</h2>
            <div className="admin-content-body">
              <TempImages />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // 권한 확인 중에는 아무것도 렌더링하지 않음 (혹은 로딩 컴포넌트)
  if (isAuthorized === false) {
    return (
      <div className="loading-modal_admin">
        <div className="loading-spinner_admin" />
      </div>
    );
  }

  return (
    <>
      {/* 로딩 모달 */}
      {onLoading && ReactDOM.createPortal(
        <div className="loading-modal_admin">
          <div className="loading-spinner_admin" />
        </div>,
        document.getElementById('root')
      )}

      {/* 메인 컨테이너 */}
      <div className="main-container_admin">
        <div className="background-animation_admin" />
        
        <div className="content-wrapper_admin">
          {!selectedMenu ? (
            // 메인 메뉴 화면
            <div className="admin-main-content">
              <div className="header-section_admin">
                <h3 className="main-title_admin">관리자 페이지</h3>
                <p className="main-subtitle_admin">시스템 관리 및 모니터링</p>
              </div>
              {renderMenuGrid()}
            </div>
          ) : (
            // 선택된 메뉴 화면
            <div className="admin-selected-content">
              {renderMenuHeader()}
              {renderContent()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;