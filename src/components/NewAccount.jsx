import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function NewAccount({
  show,
  handleNewAccount,
  handleClose,
  bgTheme,
}) {
  const [newId, setNewId] = useState("");
  const [newPw, setNewPw] = useState("");

  const handleMember = (newId, newPw) => {
    handleNewAccount(newId, newPw);
    setNewId("");
    setNewPw("");
  };

  const modalStyle = {
    backgroundColor: bgTheme === "dark" ? "white" : "#B0B6B7",
    color: bgTheme === "dark" ? "black" : "white",
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title style={modalStyle}>비디오 이름을 작성해주요</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="사용할 ID를 입력해주세요"
              value={newId}
              onChange={(e) => {
                setNewId(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>PW</Form.Label>
            <Form.Control
              type="password"
              placeholder="사용할 비밀번호를 입력해주세요"
              value={newPw}
              onChange={(e) => {
                setNewPw(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleMember(newId, newPw);
          }}
        >
          회원가입
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
