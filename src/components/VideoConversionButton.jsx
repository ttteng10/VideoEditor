import { Button } from "react-bootstrap";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { readFileAsBase64, sliderValueToVideoTime } from "../utils/utils";
import {
  GifOutlined,
  DownloadOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import FileNameModal from "./FileNameModal";
function VideoConversionButton({
  videoPlayerState,
  sliderValues,
  videoFile,
  ffmpeg,
  bgTheme,
  onConversionStart = () => {},
  onConversionEnd = () => {},
  onGifCreated = () => {},
}) {
  const [showModal, setShowModal] = useState(false);
  const [savedValue, setSavedValue] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = (value) => {
    setSavedValue(value);
  };

  const convertToGif = async () => {
    // starting the conversion process
    onConversionStart(true);

    const inputFileName = "input.mp4";
    const outputFileName = "output.gif";

    // writing the video file to memory
    ffmpeg.FS("writeFile", inputFileName, await fetchFile(videoFile));

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    // cutting the video and converting it to GIF with a FFMpeg command
    await ffmpeg.run(
      "-i",
      inputFileName,
      "-ss",
      `${minTime}`,
      "-to",
      `${maxTime}`,
      "-f",
      "gif",
      outputFileName
    );

    // reading the resulting file
    const data = ffmpeg.FS("readFile", outputFileName);

    // converting the GIF file created by FFmpeg to a valid image URL
    const gifUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );

    const link = document.createElement("a");
    link.href = gifUrl;
    link.setAttribute("download", "");
    link.click();

    // ending the conversion process

    onConversionEnd(false);
  };

  const onCutTheVideo = async (filename = "") => {
    onConversionStart(true);

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpeg.run(
      "-ss",
      `${minTime}`,
      "-i",
      "input.mp4",
      "-t",
      `${maxTime}`,
      "-c",
      "copy",
      "output.mp4"
    );

    const data = ffmpeg.FS("readFile", "output.mp4");
    const dataURL = await readFileAsBase64(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    const link = document.createElement("a");
    link.href = dataURL;
    link.setAttribute("download", filename);
    link.click();

    onConversionEnd(false);
  };

  const exportAudio = async () => {
    onConversionStart(true);

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpeg.run(
      "-ss",
      `${minTime}`,
      "-i",
      "input.mp4",
      "-to",
      `${maxTime}`,
      "-c",
      "copy",
      "output.mp3"
    );

    const data = ffmpeg.FS("readFile", "output.mp3");
    const audioUrl = await readFileAsBase64(
      new Blob([data.buffer], { type: "audio/mp3" })
    );

    const link = document.createElement("a");
    link.href = audioUrl;
    link.setAttribute("download", "audio.mp3");
    link.click();

    onConversionEnd(false);
  };

  return (
    <>
      <Button
        onClick={() => convertToGif()}
        style={{ width: 390, height: 70 }}
        variant={bgTheme === "dark" ? "light" : "dark"}
      >
        <GifOutlined />
        <p style={{ fontSize: 16, fontWeight: 700 }}>GIF 저장</p>
      </Button>
      <Button
        onClick={() => exportAudio()}
        style={{ width: 390, height: 70 }}
        variant={bgTheme === "dark" ? "light" : "dark"}
      >
        <SoundOutlined />
        <p style={{ fontSize: 16, fontWeight: 700 }}>음성 내보내기</p>
      </Button>
      <Button
        onClick={() => {
          handleShow();
        }}
        style={{ width: 390, height: 70 }}
        variant={bgTheme === "dark" ? "light" : "dark"}
      >
        <DownloadOutlined />
        <p style={{ fontSize: 16, fontWeight: 700 }}>비디오 다운로드</p>
      </Button>
      <FileNameModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        onCutTheVideo={onCutTheVideo}
        bgTheme={bgTheme}
      />
    </>
  );
}

export default VideoConversionButton;
