import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import refreshApi from '../../component/refreshApi';
import "../../css/admin_sub/users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalTab, setModalTab] = useState('logs'); // 'logs' or 'images'
  const [userLogs, setUserLogs] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [modalLogsPage, setModalLogsPage] = useState(1);
  const [modalLogsTotalPages, setModalLogsTotalPages] = useState(1);
  const [modalImagesPage, setModalImagesPage] = useState(1);
  const [modalImagesTotalPages, setModalImagesTotalPages] = useState(1);
  const [modalLoading, setModalLoading] = useState(false);
  const [render, setRender] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [render]);

  const fetchUsers = async () => {
    setLoading(true);

    await refreshApi.post(
        "/page/paging",
        {
            "pageFrom": "users"
        }
    )
    .then((res) => {
        console.log("Users res", res);
        return res.data;
    })
    .then((data) => {
        console.log("Users data", data);
        console.log("Users list", data.list);
    
        setUsers(data.list);
        setTotalPages(data.pageInfo.pageLen);
        setLoading(false);
    })
    .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
    });
  };

  const handlePageChange = async(page) => {
    setLoading(true);
    console.log("page", page);
    
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);

        await refreshApi.post(
            "/page/paging",
            {
                "page": page,
                "pageFrom": "users"
            }
        )
        .then((res) => {
            console.log("Users res", res);
            return res.data;
        })
        .then((data) => {
            console.log("Users data", data);
            console.log("Users list", data.list);
    
            setUsers(data.list);
            setTotalPages(data.pageInfo.pageLen);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error changing page:", error);
            setLoading(false);
        });
    }
  };

  const handleGradeChange = async (userId, newGrade) => {
    try {
      let trigger = true;

      await refreshApi.post(`/admin/chgrade`, {
        grade: newGrade,
        userId: userId
      })
      .then((res) => {
        console.log(res);
        if(res.data.message === "Failed") {
          trigger = false
          alert("등급 변경 중 오류가 발생했습니다.");
        }
      });
      if(trigger) {
        console.log("Trigger ", newGrade, userId);
        
        // 로컬 상태 업데이트
        setUsers(users.map(user => {
            console.log(user);
            return user.id === userId ? { ...user, grade: newGrade } : user;
          }
        ));
        setRender(!render);
      }
    } catch (error) {
      console.error("Error updating user grade:", error);
      alert("등급 변경 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("정말로 이 유저를 삭제하시겠습니까?")) {
      try {
        await refreshApi.post(
          `/admin/deleteuser`,
          {
            userId: userId
          }
        );
        
        // 로컬 상태에서 유저 제거
        setUsers(users.filter(user => user.id !== userId));
        alert("유저가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("유저 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setModalTab('logs');
    setModalLogsPage(1);
    setModalImagesPage(1);
    await fetchUserLogs(user.id, 1);
  };

  const fetchUserLogs = async (userId, page = 1) => {
    setModalLoading(true);
    console.log("userId", userId);
    try {
      const response = await refreshApi.post(`/page/paging`, {
        page: page,
        pageFrom: "userLogs",
        userId: userId
      });
      console.log("User Log", response);
      
      setUserLogs([...response.data.list].reverse());
      setModalLogsTotalPages(response.data.pageInfo.pageLen);
      setModalLogsPage(page);
    } catch (error) {
      console.error("Error fetching user logs:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const fetchUserImages = async (userId, page = 1) => {
    setModalLoading(true);
    
    try {
      const response = await refreshApi.post(`/page/paging`, {
        page: page,
        pageFrom: "userImages",
        userId: userId
      });
      console.log("User Images", response);

      setUserImages([...response.data.list].reverse());
      setModalImagesTotalPages(response.data.pageInfo.pageLen);
      setModalImagesPage(page);
    } catch (error) {
      console.error("Error fetching user images:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalTabChange = async (tab) => {
    setModalTab(tab);
    if (tab === 'images' && userImages.length === 0) {
      await fetchUserImages(selectedUser.id, 1);
    }
  };

  const handleModalLogsPageChange = async (page) => {
    if (page >= 1 && page <= modalLogsTotalPages) {
      await fetchUserLogs(selectedUser.id, page);
    }
  };

  const handleModalImagesPageChange = async (page) => {
    if (page >= 1 && page <= modalImagesTotalPages) {
      await fetchUserImages(selectedUser.id, page);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setUserLogs([]);
    setUserImages([]);
    setModalLogsPage(1);
    setModalImagesPage(1);
    setModalLogsTotalPages(1);
    setModalImagesTotalPages(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getGradeColor = (grade) => {
    const colors = [
      '#6b7280', '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
      '#8b5cf6', '#06b6d4', '#f97316', '#84cc16', '#ec4899'
    ];
    return colors[grade - 1] || '#6b7280';
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      pages.push(
        <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-btn"
        >
        ‹
        </button>
      );
    }

    if (startPage > 1) {
      pages.push(
        <button
        key={1}
        onClick={() => handlePageChange(1)}
        className="pagination-btn"
        >
        1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
          <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          >
          {i}
          </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
          pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
          <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-btn"
          >
          {totalPages}
          </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
          <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
          >
          ›
          </button>
      );
    }
  }

  const renderModalPagination = (currentPage, totalPages, onPageChange) => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="modal-pagination-btn"
        >
          ‹
        </button>
      );
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="modal-pagination-btn"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="modal-pagination-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`modal-pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="modal-pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="modal-pagination-btn"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="modal-pagination-btn"
        >
          ›
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-info">
          총 {users.length}개의 유저 (페이지 {currentPage} / {totalPages})
        </div>
      </div>

      {loading ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>유저 ID</th>
                  <th>유저 닉네임</th>
                  <th>유저 등급</th>
                  <th>가입일</th>
                  <th>마지막 로그인</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td 
                      className="clickable-cell"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.id}
                    </td>
                    <td 
                      className="clickable-cell"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.userId}
                    </td>
                    <td 
                      className="clickable-cell"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.nickName}
                    </td>
                    <td>
                      <select
                        value={user.userGrade}
                        onChange={(e) => handleGradeChange(user.id, parseInt(e.target.value))}
                        className="grade-select"
                        style={{ backgroundColor: getGradeColor(user.userGrade) }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(grade => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td 
                      className="clickable-cell"
                      onClick={() => handleUserClick(user)}
                    >
                      {formatDate(user.createAt)}
                    </td>
                    <td 
                      className="clickable-cell"
                      onClick={() => handleUserClick(user)}
                    >
                      {formatDate(user.lastLogin)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="delete-btn"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            {renderPagination()}
          </div>
        </>
      )}

      {/* 모달 */}
      {selectedUser && ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-tabs">
                <button
                  className={`modal-tab ${modalTab === 'logs' ? 'active' : ''}`}
                  onClick={() => handleModalTabChange('logs')}
                >
                  로그
                </button>
                <button
                  className={`modal-tab ${modalTab === 'images' ? 'active' : ''}`}
                  onClick={() => handleModalTabChange('images')}
                >
                  생성한 이미지
                </button>
              </div>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-user-info">
                <h3>{selectedUser.nickName} ({selectedUser.userId})</h3>
                <p>등급: {selectedUser.userGrade} | 가입일: {formatDate(selectedUser.createAt)}</p>
              </div>

              {modalTab === 'logs' && (
                <div className="modal-logs">
                  {modalLoading ? (
                    <div className="modal-loading">
                      <div className="loading-spinner"></div>
                    </div>
                  ) : userLogs.length > 0 ? (
                    <>
                      <table className="modal-table">
                        <thead>
                          <tr>
                            <th>접속 시간</th>
                            <th>IP 주소</th>
                            <th>메소드</th>
                            <th>요청 경로</th>
                            <th>상태 코드</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userLogs.map((log, index) => (
                            <tr key={index}>
                              <td>{formatDate(log.accessTime)}</td>
                              <td>{log.clientIp}</td>
                              <td>{log.requestMethod}</td>
                              <td>{log.requestLocation}</td>
                              <td>{log.statusCode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="modal-pagination-container">
                        <div className="modal-pagination-info">
                          페이지 {modalLogsPage} / {modalLogsTotalPages}
                        </div>
                        <div className="modal-pagination">
                          {renderModalPagination(modalLogsPage, modalLogsTotalPages, handleModalLogsPageChange)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="no-data">로그 데이터가 없습니다.</div>
                  )}
                </div>
              )}

              {
                modalTab === 'images' && (
                <div className="modal-images">
                  {modalLoading ? (
                    <div className="modal-loading">
                      <div className="loading-spinner"></div>
                    </div>
                  ) : userImages.length > 0 ? (
                    <>
                      <div className="images-grid">
                        {userImages.map((image, index) => (
                          <div key={index} className="image-item">
                            <img 
                              src={"/api/file/image/" + image.saveName} 
                              alt={`생성 이미지 ${index + 1}`}
                              className="modal-image"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPkltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                              }}
                            />
                            <div className="image-info">
                              <p className="image-date">{formatDate(image.createAt)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="modal-pagination-container">
                        <div className="modal-pagination-info">
                          페이지 {modalImagesPage} / {modalImagesTotalPages}
                        </div>
                        <div className="modal-pagination">
                          {renderModalPagination(modalImagesPage, modalImagesTotalPages, handleModalImagesPageChange)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="no-data">생성한 이미지가 없습니다.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.getElementById('root')
      )}
    </div>
  );
};

export default Users;