import axios from "axios";
import { React, useCallback, useState } from "react";

import "../css/main.css";

const MainPage = () => {
  const [onLoading, setOnLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);

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
      const res = await axios
        .post("https://human-finalproject-back.onrender.com/user/generate", {
          message: message,
        })
        .then((res) => {
          // console.log(res);

          return res.data;
        })
        .then((data) => {
          // console.log(data);

          setImage("data:image/png;base64," + data); // springboot에서 전송 방식 변경
          setShowImage(true);
        });
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
