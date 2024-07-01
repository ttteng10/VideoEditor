import EditorLogo from "../assets/icons/VELogoWhite.svg";
export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#4F4F4F",
        width: "100vw",
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          width: "1200px",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 10,
          padding: 0,
        }}
      >
        <img src={EditorLogo} alt="VE Logo" style={{ width: 56, height: 40 }} />
        <div
          style={{
            display: "flex",
            gap: 5,
            padding: 0,
          }}
        >
          <p style={{ color: "#E0E0E0" }}>비디오 편집</p>
          <p style={{ color: "#E0E0E0" }}>이미지 편집</p>
          <p style={{ color: "#E0E0E0" }}>로그인</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          width: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 10,
        }}
      >
        <p style={{ fontSize: 14, color: "#BDBDBD" }}>Tel.</p>
        <p style={{ fontSize: 14, color: "#BDBDBD" }}>02-2023-2024</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          width: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 10,
        }}
      >
        <p style={{ fontSize: 14, color: "#BDBDBD" }}>E-mail</p>
        <p style={{ fontSize: 14, color: "#BDBDBD" }}>iedong@naver.com</p>
      </div>
    </div>
  );
}
