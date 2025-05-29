import axios from "axios";
import { React, useCallback, useState } from "react";

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
        <h3>Test Page</h3>
        <input
          type="text"
          name="message"
          placeholder="생성 이미지 묘사"
          onChange={setData}
        />
        <button type="button" onClick={sendData}>
          생성
        </button>
      </main>
    </>
  );
};

export default MainPage;
