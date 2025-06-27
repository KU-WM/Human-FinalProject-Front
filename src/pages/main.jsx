import { useState } from "react";
import '../css/main.css';
import refreshApi from "../component/refreshApi";

const MainPage = () => {
  const [onLoading, setOnLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [audio, setAudio] = useState("");
  const [showAudio, setShowAudio] = useState(false);
  
  // 새로운 상태들
  const [soundEffects, setSoundEffects] = useState([]);
  const [soundMode, setSoundMode] = useState('buttons'); // 'buttons', 'manual'
  const [manualInput, setManualInput] = useState("");

  const showLoading = () => {
    setOnLoading(true);
  };

  const hideLoading = () => {
    setOnLoading(false);
  };

  const setData = (e) => {
    if((e.target.value).length <= 300) {
      setMessage(e.target.value);
      console.log(message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendData();
    }
  };

  const sendData = async () => {
    if (!message) {
      alert("생성할 이미지를 자세히 묘사해주세요.");
      return;
    }

    try {
      showLoading();

      const res = await refreshApi
        .post("/image/generate", {
          message: message,
        })

      console.log("res1", res);

      setImage(res.data); // springboot에서 전송 방식 변경
      setShowImage(true);

      setAudio(""); // 오디오는 일단 비워둠
      
      setShowImage(true);
      setShowAudio(false);
      setSoundEffects([]);
      setSoundMode('buttons');

    } catch (error) {
      hideLoading();
      console.log("Error ", error);
      throw error;
    } finally {
      hideLoading();
    }
  };

  const generateAutoSound = async () => {
    try {
      showLoading();
      
      const res = await refreshApi.post("/audio/generate", {
        message: message,
        imageId: image.imageId
      });
      const newSound = "/api/file/audio/" + res.data.saveName;
      
      setSoundEffects(prev => [...prev, newSound]);
      
    } catch (error) {
      console.log("Error generating auto sound:", error);
    } finally {
      hideLoading();
    }
  };

  const generateManualSound = async () => {
    if (!manualInput.trim()) {
      alert("이미지의 상황을 상세히 묘사해주세요.");
      return;
    }

    try {
      showLoading();
      
      const res = await refreshApi.post("/audio/generate", {
        message: manualInput,
        imageId: image.imageId
      });
      const newSound = "/api/file/audio/" + res.data.saveName;

      
      setSoundEffects(prev => [...prev, newSound]);
      setManualInput("");
      
    } catch (error) {
      console.log("Error generating manual sound:", error);
    } finally {
      hideLoading();
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = "/api/file/image/" + image.url;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeImageView = () => {
    setShowImage(false);
    setImage("");
    setSoundEffects([]);
    setSoundMode('buttons');
    setManualInput("");
  };

  return (
    <div className="main-container_main">
      
      {/* 배경 애니메이션 */}
      <div className="background-animation_main" />

      {/* 로딩 모달 */}
      {onLoading && (
        <div className="loading-modal_main">
          <div className="loading-spinner_main" />
        </div>
      )}

      <div className="content-wrapper_main">

        {/* 헤더 */}
        <div className={`header-section_main ${showImage ? 'header-section_main--small' : ''}`}>
          <h3 className={`main-title_main ${showImage ? 'main-title_main--small' : ''}`}>
            AI 이미지 생성기
          </h3>
          <p className={`main-subtitle_main ${showImage ? 'main-subtitle_main--small' : ''}`}>
            상상을 현실로 만들어보세요
          </p>
        </div>

        {/* 이미지 및 효과음 영역 */}
        {showImage && (
          <div className="image-sound-section_main">
            
            {/* 닫기 버튼 */}
            <button
              onClick={closeImageView}
              className="close-button_main"
            >
              ✕
            </button>

            {/* 이미지 영역 (2/3) */}
            <div className="image-section_main">
              <img
                src={"/api/file/image/" + image.url}
                alt="생성된 이미지"
                className="generated-image_main"
              />
              <button 
                onClick={downloadImage}
                className="download-button_main"
              >
                🎨 생성된 이미지 다운로드
              </button>
            </div>

            {/* 효과음 영역 (1/3) */}
            <div className="sound-section_main">
              
              {/* 상단 문구 */}
              <h4 className="sound-title_main">
                🎵 이미지에 어울리는<br/>효과음 생성
              </h4>

              {/* 효과음 리스트 */}
              {soundEffects.length > 0 && (
                <div className="sound-list_main">
                  {soundEffects.map((sound, index) => (
                    <div key={index} className="sound-item_main">
                      <div className="sound-name_main">
                        generated_audio {index + 1}
                      </div>
                      <audio controls className="sound-player_main">
                        <source src={sound} type="audio/wav" />
                        브라우저가 audio 태그를 지원하지 않습니다.
                      </audio>
                    </div>
                  ))}
                </div>
              )}

              {/* 버튼 영역 */}
              <div className="sound-controls_main">
                {soundMode === 'buttons' && (
                  <div className="sound-buttons_main">
                    <button
                      onClick={generateAutoSound}
                      className="auto-sound-button_main"
                    >
                      🤖 효과음 자동생성
                    </button>
                    <button
                      onClick={() => setSoundMode('manual')}
                      className="manual-sound-button_main"
                    >
                      ✏️ 효과음 수동생성
                    </button>
                  </div>
                )}

                {soundMode === 'manual' && (
                  <div className="manual-input-section_main">
                    <input
                      type="text"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      placeholder="이미지의 상황을 상세히 묘사해 주세요"
                      className="manual-input_main"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          generateManualSound();
                        }
                      }}
                    />
                    <div className="manual-buttons_main">
                      <button
                        onClick={generateManualSound}
                        className="submit-button_main"
                      >
                        전송
                      </button>
                      <button
                        onClick={() => {
                          setSoundMode('buttons');
                          setManualInput('');
                        }}
                        className="cancel-button_main"
                      >
                        되돌리기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 입력 영역 */}
        <div className={`input-section_main ${showImage ? 'input-section_main--small' : ''}`}>
          
          <div className="input-wrapper_main">
            <input
              type="text"
              value={message}
              placeholder="생성할 이미지를 자세히 묘사해주세요..."
              onChange={setData}
              onKeyDown={handleKeyDown}
              disabled={onLoading}
              className="main-input_main"
            />
          </div>

          <button 
            onClick={sendData}
            disabled={onLoading}
            className="generate-button_main"
          >
            ✨ 생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;