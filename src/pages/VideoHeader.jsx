import { Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VideoHeader({ bgTheme, videoFile, setVideoFile }) {
  const uploadFile = useRef();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
          marginLeft: "auto",
          marginRight: "auto",
          width: 1200,
        }}
      >
        <h2 onClick={() => setVideoFile()} style={{ cursor: "pointer" }}>
          Video Editor
        </h2>
        {videoFile ? (
          <div>
            <input
              onChange={(e) => setVideoFile(e.target.files[0])}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              ref={uploadFile}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <Button
                variant={bgTheme === "dark" ? "light" : "dark"}
                onClick={() => uploadFile.current.click()}
                style={{ width: "fit-content" }}
              >
                비디오 재선택
              </Button>
              <Button
                variant={bgTheme === "dark" ? "light" : "dark"}
                onClick={() => setVideoFile()}
                style={{ width: "fit-content" }}
              >
                편집 취소
              </Button>
            </div>
          </div>
        ) : (
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
              onClick={() => uploadFile.current.click()}
            >
              비디오 업로드
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
