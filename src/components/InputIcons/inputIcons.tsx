import React, { useRef, useState } from "react";
import { Input, Tooltip } from "antd";
import {
  PaperClipOutlined,
  SendOutlined,
  CameraOutlined,
  VideoCameraOutlined,
  FileOutlined,
} from "@ant-design/icons";
import "./inputIcons.css";

const CustomInput: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  const handleFileClick = (type: string) => {
    setFileType(type);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputValue(file.name);
      console.log(`Selected ${fileType}:`, file);
    }
  };

  return (
    <div className="input-container">
      <Input
        placeholder="Reply to @Rohith Yadav"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        suffix={
          <>
            <Tooltip
              title={
                <div className="tooltip-section">
                  <div onClick={() => handleFileClick("image")}>
                    <CameraOutlined className="tooltip-icons" />
                  </div>
                  <div onClick={(e) => handleFileClick("video")}>
                    <VideoCameraOutlined className="tooltip-icons" />
                  </div>
                  <div onClick={(e) => handleFileClick("file")}>
                    <FileOutlined className="tooltip-icons" />
                  </div>
                </div>
              }
              placement="bottom"
              overlayClassName="custom-tooltip"
            >
              <PaperClipOutlined className="iconSize" />
            </Tooltip>
            <Tooltip title="Send" placement="bottom">
              <SendOutlined className="iconSize" />
            </Tooltip>
          </>
        }
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the input
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CustomInput;
