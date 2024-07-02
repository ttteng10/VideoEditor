import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import EditorLogo from "../assets/icons/Frame 129.svg";
import EditorLogoWhite from "../assets/icons/VELogoWhite.svg";
export default function Header({ bgTheme, login, setLogin }) {
  const location = useLocation();
  const pathname = location.pathname;

  const handleLogin = () => {
    if (login === true) {
      setLogin(false);
    }
  };

  return (
    <div
      style={{
        borderBottom: "1px solid #E0E0E0",
        padding: 5,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 1200,
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 10,
          padding: 0,
        }}
      >
        <img
          src={bgTheme === "dark" ? EditorLogoWhite : EditorLogo}
          alt="VE Logo"
          style={{ width: 56, height: 40 }}
        />
        <div
          style={{
            display: "flex",
            gap: 5,
            padding: 0,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <p
              style={
                pathname === "/"
                  ? { color: bgTheme === "dark" ? "white" : "black" }
                  : { color: "#828282" }
              }
            >
              비디오 편집
            </p>
          </Link>
          <Link to="/imageEdit" style={{ textDecoration: "none" }}>
            <p
              style={
                pathname === "/imageEdit"
                  ? { color: bgTheme === "dark" ? "white" : "black" }
                  : { color: "#828282" }
              }
            >
              이미지 편집
            </p>
          </Link>
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            onClick={handleLogin}
          >
            <p
              style={
                pathname === "/login"
                  ? { color: bgTheme === "dark" ? "white" : "black" }
                  : { color: "#828282" }
              }
            >
              {login ? "로그아웃" : "로그인"}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
