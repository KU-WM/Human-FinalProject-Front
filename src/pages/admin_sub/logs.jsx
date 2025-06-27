import React, { useState, useEffect } from 'react';
import refreshApi from '../../component/refreshApi';
import "../../css/admin_sub/logs.css";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('accessTime');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);

    await refreshApi.post(
        "/page/paging",
        {
            "pageFrom": "logs"
        }
    )
    .then((res) => {
        console.log("Logs res", res);
        return res.data;
    })
    .then((data) => {
        console.log("Logs data", data);
        console.log("Logs list", data.list);
    
        setLogs(data.list);
        setTotalPages(data.pageInfo.pageLen);
        setLoading(false);
    })

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
                "pageFrom": "logs"
            }
        )
        .then((res) => {
            console.log("Logs res", res);
            return res.data;
        })
        .then((data) => {
            console.log("Logs data", data);
            console.log("Logs list", data.list);
    
            setLogs(data.list);
            setTotalPages(data.pageInfo.pageLen);
            setLoading(false);
        })
    }
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

  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return '#10b981'; // 성공 - 초록색
    if (statusCode >= 300 && statusCode < 400) return '#f59e0b'; // 리다이렉트 - 주황색
    if (statusCode >= 400 && statusCode < 500) return '#ef4444'; // 클라이언트 에러 - 빨간색
    if (statusCode >= 500) return '#dc2626'; // 서버 에러 - 진한 빨간색
    return '#6b7280'; // 기타 - 회색
  };

  const refreshLogs = async() => {
    setLoading(true);

    await refreshApi.get(
        "/log/refresh"
    )
    .then((res) => {
        console.log("Refresh Log", res);
    })

    handlePageChange(1);
    setLoading(false);
  }

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return '#3b82f6'; // 파란색
      case 'POST': return '#10b981'; // 초록색
      case 'PUT': return '#f59e0b'; // 주황색
      case 'DELETE': return '#ef4444'; // 빨간색
      default: return '#6b7280'; // 회색
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 페이지 버튼
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

    // 첫 페이지
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

    // 페이지 번호들
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

    // 마지막 페이지
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

    // 다음 페이지 버튼
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

    return pages;
  };

  return (
    <div className="logs-container">
      <div className="logs-header">
        <div className="logs-info">
          총 {logs.length}개의 로그 (페이지 {currentPage} / {totalPages})
        </div>
        <button className='logs-refresh-button' onClick={refreshLogs}>로그 갱신</button>
      </div>

      {loading ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    접속 시간
                  </th>
                  <th>
                    클라이언트 IP
                  </th>
                  <th>
                    메소드
                  </th>
                  <th>
                    요청 경로
                  </th>
                  <th>
                    상태 코드
                  </th>
                  <th>
                    전송 바이트
                  </th>
                  <th>
                    USER ID / UUID
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{formatDate(log.accessTime)}</td>
                    <td className="ip-cell">{log.clientIp}</td>
                    <td>
                      <span 
                        className="method-badge" 
                        style={{ backgroundColor: getMethodColor(log.requestMethod) }}
                      >
                        {log.requestMethod}
                      </span>
                    </td>
                    <td>{log.requestLocation}</td>
                    <td>
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(log.statusCode) }}
                      >
                        {log.statusCode}
                      </span>
                    </td>
                    <td className="bytes-cell">{log.bytesSent.toLocaleString()}</td>
                    <td className="uuid-cell" title={log.uuid}>{log.uuid}</td>
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
    </div>
  );
};

export default Logs;