import { React } from "react";

const MainPage = () => {
  return (
    <>
      <main>
        <h3>Test Page</h3>
        <form
          action="https://human-finalproject-back.onrender.com/user/answer"
          method="POST"
        >
          <input type="text" name="message" placeholder="생성 이미지 묘사" />
          <button type="submit">submit</button>
        </form>
      </main>
    </>
  );
};

export default MainPage;
