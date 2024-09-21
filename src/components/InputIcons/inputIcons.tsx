import React from "react";
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
  return (
    <div className="input-container">
      <Input
        placeholder="Reply to @Rohith Yadav"
        suffix={
          <>
            <Tooltip
              title={
                <div className="tooltip-section">
                  <CameraOutlined className="tooltip-icons" />
                  <VideoCameraOutlined className="tooltip-icons" />
                  <FileOutlined style={{ color: "white" }} />
                </div>
              }
              placement="bottom"
              overlayInnerStyle={{ backgroundColor: "green", border: "none" }}
              overlayClassName="custom-tooltip"
            >
              <PaperClipOutlined style={{ color: "#555", cursor: "pointer" }} />
            </Tooltip>
            <Tooltip title="Send" placement="bottom">
              <SendOutlined
                style={{
                  color: "#0078ff",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </>
        }
      />
    </div>
  );
};

export default CustomInput;
