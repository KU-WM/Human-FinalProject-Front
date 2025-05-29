import axios from "axios";
import { React, useCallback, useState } from "react";

import "../css/main.css";

const MainPage = () => {
  const [message, setMessage] = useState("");

  const setData = (e) => {
    console.log("message", e.target.value);
    setMessage(e.target.value);
  };

  const sendData = async () => {
    console.log("Send Data!");

    try {
      axios
        .post("https://human-finalproject-back.onrender.com/user/answer", {
          message: message,
        })
        .then((res) => {
          console.log("Response: ", res);
          return res.data;
        });
    } catch (error) {
      console.log("Error ", error);
      throw error;
    }
  };

  return (
    <>
      <main>
        <div className="decorative-element"></div>
        <div className="decorative-element"></div>

        <h3>AI 이미지 생성기</h3>
        <p className="subtitle">상상을 현실로 만들어보세요</p>

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
