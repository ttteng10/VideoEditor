import styles from "./VideoEditor.module.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ToggleButton = ({ setBgTheme }) => {
  const [theme, setTheme] = useState("dark");
  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setBgTheme("dark");
    } else {
      setTheme("dark");
      setBgTheme("light");
    }
  };
  return (
    <div className={styles.center_section} style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "end", width: 1200 }}>
        <Button
          style={{ width: 60, fontSize: 10 }}
          variant={theme}
          onClick={handleTheme}
        >
          {theme === "dark" ? "Dark" : "Light"}
        </Button>
      </div>
    </div>
  );
};

export default ToggleButton;
