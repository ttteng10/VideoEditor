import { Col, Form, Row, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewAccount from "../components/NewAccount";

import EditorLogo from "../assets/icons/Frame 129.svg";
import EditorLogoWhite from "../assets/icons/VELogoWhite.svg";

const dummy = [{ id: "admin", pw: "admin" }];

export default function Login({ bgTheme, setLogin }) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const inputId = useRef();
  const inputPw = useRef();
  const navigate = useNavigate();
  const loginClick = () => {
    navigate("/");
  };

  const [member, setMember] = useState(dummy);
  const handleMember = (newId, newPw) => {
    setMember([...member, { id: newId, pw: newPw }]);
  };
  const handleNewAccount = (newId, newPw) => {
    handleMember(newId, newPw);
    handleClose();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {}, [member]);

  return (
    <div>
      <div
        style={{
          height: 724,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={bgTheme === "dark" ? EditorLogoWhite : EditorLogo}
          alt="VE Logo"
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <h2
          style={{
            marginBottom: 50,
          }}
        >
          Video Editor
        </h2>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              ID
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                ref={inputId}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              PW
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                ref={inputPw}
              />
            </Col>
          </Form.Group>
        </Form>
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            onClick={() => {
              if (pw === "") {
                inputPw.current.focus();
              }
              if (id === "") {
                inputId.current.focus();
              }
              member.map((e) => {
                console.log(e.id, e.pw);
                if (e.id === id && e.pw === pw) {
                  loginClick();
                  setId("");
                  setPw("");
                  setLogin(true);
                }
              });
            }}
            style={{ width: 150, height: 50 }}
            variant={bgTheme === "dark" ? "light" : "dark"}
          >
            로그인
          </Button>
          <Button
            style={{ width: 150, height: 50 }}
            variant={bgTheme === "dark" ? "light" : "dark"}
            onClick={() => {
              handleShow();
            }}
          >
            회원가입
          </Button>
          <NewAccount
            show={show}
            handleNewAccount={handleNewAccount}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
