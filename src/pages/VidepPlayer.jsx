import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react";
import "video-react/dist/video-react.css";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoEditor.module.css";

export default function VideoPlayer({
  src,
  onPlayerChange = () => {},
  onChange = () => {},
  startTime = undefined,
}) {
  const [player, setPlayer] = useState(undefined);
  const [playerState, setPlayerState] = useState(undefined);
  const [source, setSource] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    setSource(URL.createObjectURL(src));
  }, [src]);

  useEffect(() => {
    if (playerState) {
      onChange(playerState);
    }
  }, [playerState]);

  useEffect(() => {
    onPlayerChange(player);

    if (player) {
      player.subscribeToStateChange(setPlayerState);
    }
  }, [player]);

  const handleDurationChange = () => {
    const duration = player.getState().player.duration;
    setVideoDuration(duration);
  };
  const handleTimeUpdate = () => {
    const currentTime = player.getState().player.currentTime;
    setCurrentTime(currentTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${secs < 10 ? "0" : ""}${secs}`;
    // return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={styles.video_player}>
      <Player
        ref={(player) => {
          setPlayer(player);
        }}
        startTime={startTime}
        src={source}
        onDurationChange={handleDurationChange}
        onTimeUpdate={handleTimeUpdate}
        className={styles.video_player}
        aspectRatio="16:9"
      >
        <source src={source} />
        <BigPlayButton position="center" />

        <LoadingSpinner />
        <ControlBar disableCompletely></ControlBar>
      </Player>
      <div style={{ marginTop: "30px" }}>
        <strong style={{ color: "#828282", fontWeight: 500, fontSize: 16 }}>
          재생 시간:{" "}
        </strong>
        {formatTime(currentTime)} 초
      </div>
    </div>
  );
}
