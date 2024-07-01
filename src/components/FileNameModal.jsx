import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function FileNameModal({
  show,
  handleClose,
  handleSave,
  onCutTheVideo,
  bgTheme,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    handleSave(inputValue);
    setInputValue("");
    onCutTheVideo(inputValue);
    handleClose();
  };

  const modalStyle = {
    backgroundColor: bgTheme === "dark" ? "white" : "gray",
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
            <Form.Label style={modalStyle}>비디오 이름 입력</Form.Label>
            <Form.Control
              type="text"
              placeholder="입력하세요"
              value={inputValue}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FileNameModal;
