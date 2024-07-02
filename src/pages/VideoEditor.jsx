import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { sliderValueToVideoTime } from "../utils/utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import video_placeholder from "../assets/images/videoplaceholder.png";
import check_circle from "../assets/icons/check_circle.svg";
import Header from "./Header";
import Footer from "./Footer";
import VideoPlayer from "./VidepPlayer";
import VideoHeader from "./VideoHeader";
import ToggleButton from "./ToggleButton";
import MultiRangeSlider from "../components/MultiRangerSlider";
import VideoConversionButton from "../components/VideoConversionButton";
import Login from "./Login";
import ImageEdit from "./ImageEdit";

import styles from "./VideoEditor.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ffmpeg = createFFmpeg({ log: false });

const VideoEditor = () => {
  const uploadFile = useRef();
  const [videoFile, setVideoFile] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [bgTheme, setBgTheme] = useState("light");
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [processing, setProcessing] = useState(false);
  const [show, setShow] = useState(false);
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);

  useEffect(() => {
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);
  useEffect(() => {
    const min = sliderValues[0];

    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;

      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState]);

  useEffect(() => {
    if (!videoFile) {
      setVideoPlayerState(undefined);
      setVideoPlayerState(undefined);
    }
    setSliderValues([0, 100]);
  }, [videoFile]);

  useEffect(() => {
    if (bgTheme === "dark") {
      document.body.classList.add("dark_mode");
      document.body.classList.remove("light_mode");
    } else {
      document.body.classList.add("light_mode");
      document.body.classList.remove("dark_mode");
    }
  }, [bgTheme]);

  return (
    <BrowserRouter>
      <article>
        <Header bgTheme={bgTheme} />
        <ToggleButton setBgTheme={setBgTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <VideoHeader
                  bgTheme={bgTheme}
                  videoFile={videoFile}
                  setVideoFile={setVideoFile}
                />
                <section
                  className={styles.center_section}
                  style={{ marginBottom: 10 }}
                >
                  {videoFile ? (
                    <div>
                      <VideoPlayer
                        src={videoFile}
                        onPlayerChange={(videoPlayer) => {
                          setVideoPlayer(videoPlayer);
                        }}
                        onChange={(videoPlayerState) => {
                          setVideoPlayerState(videoPlayerState);
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          width: "1200px",
                          height: "500px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#F2F2F2",
                          marginBottom: 24,
                        }}
                      >
                        <img
                          src={video_placeholder}
                          alt="비디오를 업로드해주세요."
                          style={{ marginBottom: 32 }}
                        />
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="video/*"
                          style={{ display: "none" }}
                          ref={uploadFile}
                          onChange={(e) => setVideoFile(e.target.files[0])}
                        />
                        <Button
                          variant={bgTheme === "dark" ? "light" : "dark"}
                          style={{ width: 360 }}
                          onClick={() => uploadFile.current.click()}
                        >
                          비디오 업로드
                        </Button>
                      </div>
                    </>
                  )}
                </section>

                {videoFile && (
                  <>
                    <section
                      style={{
                        width: "100%",
                        marginTop: 30,
                        marginBottom: 30,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <MultiRangeSlider
                        min={0}
                        max={100}
                        onChange={({ min, max }) => {
                          setSliderValues([min, max]);
                        }}
                      />
                    </section>

                    <section
                      style={{
                        width: "100%",
                        marginBottom: 30,
                        display: "flex",
                        gap: 16,
                        justifyContent: "center",
                      }}
                    >
                      <VideoConversionButton
                        onConversionStart={() => {
                          setProcessing(true);
                        }}
                        onConversionEnd={() => {
                          setProcessing(false);
                          setShow(true);
                        }}
                        ffmpeg={ffmpeg}
                        videoPlayerState={videoPlayerState}
                        sliderValues={sliderValues}
                        videoFile={videoFile}
                        bgTheme={bgTheme}
                      />
                    </section>
                  </>
                )}
              </>
            }
          />
          <Route path="/imageEdit" element={<ImageEdit />} />
          <Route path="/login" element={<Login bgTheme={bgTheme} />} />
        </Routes>

        <ToastContainer
          className="p-3"
          position={"top-center"}
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            bg="light"
            autohide
          >
            <Toast.Body>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <img src={check_circle} />
                내보내기가 완료되었습니다.
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>

        <Modal
          show={processing}
          onHide={() => setProcessing(false)}
          // backdrop="static"
          backdrop={false}
          keyboard={false}
          centered
          size="m"
        >
          <div
            style={{
              width: "100%",
              // width: "313px",
              height: "269px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{ width: "7rem", height: "7rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>

            <p
              style={{
                marginTop: 16,
                marginBottom: 21,
                fontSize: 14,
                fontWeight: 600,
                color: "#c8c8c8",
                textAlign: "center",
              }}
            >
              내보내기가 진행중입니다.
            </p>
            <Button
              variant="outline-secondary"
              style={{ width: "310px" }}
              onClick={() => setProcessing(false)}
            >
              내보내기 취소
            </Button>
          </div>
        </Modal>
        <Footer />
      </article>
    </BrowserRouter>
  );
};

export default VideoEditor;
