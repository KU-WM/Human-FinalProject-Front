import { useState } from "react";
import "../css/login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [onLoading, setOnLoading] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  
  // 회원가입용 추가 필드들
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const showLoading = () => {
    setOnLoading(true);
  };

  const hideLoading = () => {
    setOnLoading(false);
  };

  const login = async() => {
    if (!userId || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    showLoading();

    try {
        await axios.post(
            "/api/login",
            new URLSearchParams({
                username: userId,
                password: password,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true
            }
        )
        .then((res) => {
            console.log("login_success", res);
            return res.data;
        })
        .then((data) => {
            console.log(data);
            window.localStorage.setItem("token", data.accessToken);
            if(data.userGrade === "ROLE_10") {
              window.localStorage.setItem("isAdmin", true);
            }
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin");
            hideLoading();

            navigate(redirectPath); // react-router 기준
        })

    } catch (error) {
        hideLoading();
        console.error('로그인인 실패:', error);
        alert('로그인에 실패했습니다.');
    }
  };

  const signup = async() => {
    if (!userId || !password || !confirmPassword || !name) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    showLoading();

    try {
        await axios.post(
            "/api/user/register",
            {
                userId: userId,
                userPw: password,
                nickName: name,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        )
        .then((res) => {
            console.log(res);
            return res.data;
        })
        .then((data) => {
            console.log(data);
            hideLoading();
            alert('회원가입에 성공하였습니다.\n다시 로그인 해 주세요.');

            window.location.reload();
        })
      
    } catch (error) {
      hideLoading();
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode);
    // 필드 초기화
    setUserId('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setName('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      isSignupMode ? signup() : login();
    }
  };

  return (
    <>
      {/* 로딩 모달 */}
      <div className={onLoading ? "loadingModal" : "endModal"}>
        <div className="spinner"></div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="main-container">
        {/* 헤더 영역 */}
        <div className="header-section">
          <h3>{isSignupMode ? '회원가입' : '로그인'}</h3>
          <p className="subtitle">
            {isSignupMode 
              ? '새 계정을 만들어 서비스를 시작하세요' 
              : '계정에 로그인하여 서비스를 이용하세요'
            }
          </p>
        </div>

        {/* 입력 영역 */}
        <div className="input-section">
          <div className="input-container">
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={onLoading}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={onLoading}
            />
          </div>

          {/* 회원가입 모드일 때만 보이는 추가 필드들 */}
          {isSignupMode && (
            <>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={onLoading}
                />
              </div>

              <div className="input-container">
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={onLoading}
                />
              </div>
            </>
          )}

          <button
            type="button"
            onClick={isSignupMode ? signup : login}
            disabled={onLoading}
          >
            {onLoading 
              ? (isSignupMode ? '가입 중...' : '로그인 중...') 
              : (isSignupMode ? '✨ 회원가입' : '✨ 로그인')
            }
          </button>

          {/* 모드 전환 버튼 */}
          <button
            type="button"
            onClick={toggleMode}
            disabled={onLoading}
            style={{
              marginTop: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            {isSignupMode ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;