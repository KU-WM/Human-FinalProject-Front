import axios from "axios";
import { useEffect, useState } from "react";
import refreshApi from "../component/refreshApi";

const MyPage = () => {
  const [onLoading, setOnLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        showLoading();
        const res = await refreshApi
          .get("/image/list")
          .then((res) => {
            console.log("res: ", res);

            return res.data;
          })
          .then((data) => {
            console.log("data: ", data);
            setImageList(data);
          });
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        hideLoading();
      }
    };

    getImages();
  }, []);

  const showLoading = () => {
    setOnLoading(true);
  };

  const hideLoading = () => {
    setOnLoading(false);
  };

  const downloadImage = (image) => {
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
        {imageList.map((image) => (
          <div className="image-section">
            <div className="image-container">
              <img
                src={"/api/file/image/" + image.saveName}
                alt="생성된 이미지"
                className="generated-image"
              />
              <button
                onClick={() =>
                  downloadImage("/api/file/image/" + image.saveName)
                }
                className="new-image-btn"
              >
                🎨 생성된 이미지 다운로드
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default MyPage;
