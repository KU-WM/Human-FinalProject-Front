import axios from "axios";
import { useState } from "react";

import "../css/main.css";

const MainPage = () => {
  const [onLoading, setOnLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [audio, setAudio] = useState("");
  const [showAudio, setShowAudio] = useState(false);

  const showLoading = () => {
    setOnLoading(true);
  };

  const hideLoading = () => {
    setOnLoading(false);
  };

  const setData = (e) => {
    setMessage(e.target.value);
  };

  const sendData = async () => {
    try {
      showLoading();

      const [res1, res2] = await Promise.all([
        axios
        .post("/api/image/generate", {
          message: message,
        }),
        axios
        .post("/api/audio/generate", {
          message: message,
        })
      ])
      console.log("res1", res1);
      console.log("res2", res2);

      setImage("/api/file/image/" + res1.data); // springboot에서 전송 방식 변경
      setShowImage(true);
      setAudio("/api/file/audio/" + res2.data); // springboot에서 전송 방식 변경
      setShowAudio(true);

    } catch (error) {
      hideLoading();
      console.log("Error ", error);
      throw error;
    } finally {
      hideLoading();
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated_image.png"; // 원하는 파일 이름
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={onLoading ? "loadingModal" : "endModal"}>
        <div className="spinner"></div>
      </div>
      <main>
        <div className="decorative-element"></div>
        <div className="decorative-element"></div>

        <h3>AI 이미지 생성기</h3>
        <p className="subtitle">상상을 현실로 만들어보세요</p>

        {/* 이미지 표시 영역 */}
        {showImage && (
          <div className="image-section">
            <div className="image-container">
              <img
                src={image}
                alt="생성된 이미지"
                className="generated-image"
              />
              <button onClick={downloadImage} className="new-image-btn">
                🎨 생성된 이미지 다운로드
              </button>
            </div>
          </div>
        )}

        {showAudio && (
          <audio controls>
            <source src={audio} type="audio/wav" />
            브라우저가 audio 태그를 지원하지 않습니다.
          </audio>
        )}
        <div className="input-container">
          <input
            type="text"
            name="message"
            placeholder="생성할 이미지를 자세히 묘사해주세요..."
            id="messageInput"
            onChange={setData}
          />
        </div>

        <button type="button" id="generateBtn" onClick={sendData}>
          ✨ 생성하기
        </button>
      </main>
    </>
  );
};

export default MainPage;
