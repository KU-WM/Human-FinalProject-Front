import { useEffect, useState } from "react";
import refreshApi from "../component/refreshApi";
import "../css/myPage.css";
import DL_Icon from "../icon/dl_icon.png";
import Info_Icon from "../icon/info_icon.png"

const MyPage = () => {
  const [onLoading, setOnLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [showDlBtn, setShowDlBtn] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [soundEffects, setSoundEffects] = useState([]);
  const [soundMode, setSoundMode] = useState('buttons');
  const [manualInput, setManualInput] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        showLoading();
        const res = await refreshApi.get("/image/list");
        console.log("res", res);
        
        setImageList(res.data);
        setShowDlBtn(Array.from({ length: res.data.length }, () => false));
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

  const deleteImage = async (image, event, index) => {
    event.stopPropagation();
    if (window.confirm("이미지를 삭제하시겠습니까?")) {
      try {
        await refreshApi
          .post(
            `/image/delete`,
            {
              id: image.id
            }
          );
        const newImageList = imageList.filter((_, i) => i !== index);
        setImageList(newImageList);
        setShowDlBtn(Array.from({ length: newImageList.length }, () => false));
      } catch (error) {
        console.log("Error deleting image:", error);
      }
    }
  };

  const deleteSound = async (audio, soundIndex) => {
    if (window.confirm("효과음을 삭제하시겠습니까?")) {
      try {
        await refreshApi
          .post(
            `/audio/delete`,
            {
              id: audio.id
            }
          );
        
        const newSoundEffects = soundEffects.filter((_, index) => index !== soundIndex);
        setSoundEffects(newSoundEffects);
      } catch (error) {
        console.log("Error deleting sound:", error);
      }
    }
  };


  const downloadImage = (image, event) => {
    event.stopPropagation(); // 이미지 클릭 이벤트 방지
    const link = document.createElement("a");
    link.href = "/api/file/image/" + image.saveName;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ableDL = (index) => {
    const newState = showDlBtn.map((state, i) => i === index);
    setShowDlBtn(newState);
  };

  const disableDL = () => {
    setShowDlBtn(Array.from({ length: imageList.length }, () => false));
  };

  const openModal = async (image) => {
    setSelectedImage(image);
    setShowModal(true);
    setSoundEffects([]);
    setSoundMode('buttons');
    setManualInput('');
    
    // 해당 이미지의 효과음 파일들 로딩
    try {
      setModalLoading(true);
      // 여기서 효과음 리스트를 불러오는 API 호출
      const audioRes = await refreshApi.get(`/audio/list/${image.id}`);
      console.log("Audio ", audioRes);
      
      setSoundEffects(audioRes.data || []);

    } catch (error) {
      console.log("Error loading audio files:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setSoundEffects([]);
    setSoundMode('buttons');
    setManualInput('');
  };

  const generateAutoSound = async () => {
    if (!selectedImage) return;
    
    try {
      setModalLoading(true);
      const res = await refreshApi.post("/audio/generate", {
        message: selectedImage.userInput,
        imageId: selectedImage.id
      });

      console.log("Generated", res);

      const newSound = res.data;
      setSoundEffects(prev => [...prev, newSound]);
    } catch (error) {
      console.log("Error generating auto sound:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const generateManualSound = async () => {
    if (!manualInput.trim() || !selectedImage) {
      alert("이미지의 상황을 상세히 묘사해주세요.");
      return;
    }

    try {
      setModalLoading(true);
      const res = await refreshApi.post("/audio/generate", {
        message: manualInput,
        imageId: selectedImage.id
      });
      const newSound = "/api/file/audio/" + res.data;
      setSoundEffects(prev => [...prev, newSound]);
      setManualInput("");
    } catch (error) {
      console.log("Error generating manual sound:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const ableBtn = () => {
    setShowBtn(true)
  }

  const disableBtn = () => {
    setShowBtn(false)
  }
  return (
    <>
      {/* 로딩 모달 */}
      {onLoading && (
        <div className="loading-modal_mypage">
          <div className="loading-spinner_mypage" />
        </div>
      )}

      {/* 이미지 모달 */}
      {showModal && selectedImage && (
        <div className="image-modal-overlay_mypage" onClick={closeModal}>
          <div className="image-modal_mypage" onClick={(e) => e.stopPropagation()}>
            
            {/* 모달 로딩 */}
            {modalLoading && (
              <div className="modal-loading_mypage">
                <div className="loading-spinner_mypage" />
              </div>
            )}

            {/* 닫기 버튼 */}
            <button onClick={closeModal} className="modal-close-button_mypage">
              ✕
            </button>

            <div className="modal-content_mypage">
              {/* 이미지 영역 */}
              <div className="modal-image-section_mypage">
                <img
                  src={"/api/file/image/" + selectedImage.saveName}
                  alt="생성된 이미지"
                  className="modal-image_mypage"
                  onMouseEnter={ableBtn}
                  onMouseLeave={disableBtn}
                />
                <div className="image-buttons-container_mypage_onModal" style={{ display: showBtn ? "flex" : "none" }} onMouseEnter={ableBtn}>
                  <button
                    onClick={(e) => downloadImage(selectedImage, e)}
                    className="dl-image-btn_mypage"
                    title="이미지 다운로드"
                  >
                    <img className="dl-icon_mypage" src={DL_Icon} alt="다운로드 아이콘" />
                  </button>
                  <button
                    // onClick={(e) => deleteImage(selectedImage, e, index)} 
                    className="delete-image-btn_mypage"
                    title="이미지 정보"
                  >
                    <img className="dl-icon_mypage" src={Info_Icon} alt="상세정보 아이콘" />
                  </button>
                </div>
              </div>

              {/* 효과음 영역 */}
              <div className="modal-sound-section_mypage">
                <h4 className="modal-sound-title_mypage">
                  🎵 이미지에 어울리는<br/>효과음 생성
                </h4>

                {/* 효과음 리스트 */}
                <div className="modal-sound-list-container_mypage">
                  {soundEffects.length > 0 && (
                    <div className="modal-sound-list_mypage">
                      {soundEffects.map((sound, index) => (
                        <div key={index} className="modal-sound-item_mypage">
                          <div className="modal-sound-header_mypage">
                            <div className="modal-sound-name_mypage">
                              generated_audio {index + 1}
                            </div>
                              <button
                                onClick={() => deleteSound(sound, index)}
                                className="modal-sound-delete-btn_mypage"
                                title="효과음 삭제"
                              >
                                ✕
                              </button>
                          </div>
                          <audio controls className="modal-sound-player_mypage">
                            <source src={"/api/file/audio/" + sound.saveName} type="audio/wav" />
                            브라우저가 audio 태그를 지원하지 않습니다.
                          </audio>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 버튼 영역 */}
                <div className="modal-sound-controls_mypage">
                  {soundMode === 'buttons' && (
                    <div className="modal-sound-buttons_mypage">
                      <button
                        onClick={generateAutoSound}
                        className="modal-auto-sound-button_mypage"
                        disabled={modalLoading}
                      >
                        🤖 효과음 자동생성
                      </button>
                      <button
                        onClick={() => setSoundMode('manual')}
                        className="modal-manual-sound-button_mypage"
                        disabled={modalLoading}
                      >
                        ✏️ 효과음 수동생성
                      </button>
                    </div>
                  )}

                  {soundMode === 'manual' && (
                    <div className="modal-manual-input-section_mypage">
                      <input
                        type="text"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        placeholder="이미지의 상황을 상세히 묘사해 주세요"
                        className="modal-manual-input_mypage"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            generateManualSound();
                          }
                        }}
                        disabled={modalLoading}
                      />
                      <div className="modal-manual-buttons_mypage">
                        <button
                          onClick={generateManualSound}
                          className="modal-submit-button_mypage"
                          disabled={modalLoading}
                        >
                          전송
                        </button>
                        <button
                          onClick={() => {
                            setSoundMode('buttons');
                            setManualInput('');
                          }}
                          className="modal-cancel-button_mypage"
                          disabled={modalLoading}
                        >
                          되돌리기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div className="main-container_mypage">
        <div className="background-animation_mypage" />
        
        <div className="content-wrapper_mypage">
          <div className="header-section_mypage">
            <h3 className="main-title_mypage">내 이미지 갤러리</h3>
            <p className="main-subtitle_mypage">생성한 이미지들을 확인하고 효과음을 만들어보세요</p>
          </div>

          <div className="image-grid_mypage">
            {imageList.map((image, index) => (
              <div key={index} className="image-card_mypage">
                <div 
                  className="image-container_mypage"
                  onMouseEnter={() => ableDL(index)}
                  onMouseLeave={disableDL}
                  onClick={() => openModal(image)}
                >
                  <img
                    src={"/api/file/image/" + image.saveName}
                    alt="생성된 이미지"
                    className="grid-image_mypage"
                  />
                  <div className="image-buttons-container_mypage" style={{ display: showDlBtn[index] ? "flex" : "none" }}>
                    <button
                      onClick={(e) => downloadImage(image, e)}
                      className="dl-image-btn_mypage"
                      title="이미지 다운로드"
                    >
                      <img className="dl-icon_mypage" src={DL_Icon} alt="다운로드 아이콘" />
                    </button>
                    <button
                      onClick={(e) => deleteImage(image, e, index)}
                      className="delete-image-btn_mypage"
                      title="이미지 삭제"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;