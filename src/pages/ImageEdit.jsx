import { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import styles from "./VideoEditor.module.css";
export default function ImageEdit({ bgTheme }) {
  const [imageFile, setImageFile] = useState();
  const uploadFile = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };
  return (
    <section className={styles.center_section} style={{ marginBottom: 10 }}>
      {imageFile ? (
        <>
          <div
            style={{
              width: "1200px",
              height: "500px",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              marginBottom: 10,
              marginTop: 10,
            }}
          ></div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={uploadFile}
            onChange={handleFileChange}
          />
          <Button
            variant={bgTheme === "dark" ? "light" : "dark"}
            style={{ width: 360 }}
            onClick={() => uploadFile.current.click()}
          >
            이미지 재선택
          </Button>
        </>
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
              src={imageFile}
              alt="이미지를 업로드해주세요."
              style={{ marginBottom: 32 }}
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={uploadFile}
              onChange={handleFileChange}
            />
            <Button
              variant={bgTheme === "dark" ? "light" : "dark"}
              style={{ width: 360 }}
              onClick={() => uploadFile.current.click()}
            >
              이미지 업로드
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
