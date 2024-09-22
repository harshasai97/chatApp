import React, { useState, useRef, useEffect } from "react";
import { Menu, Dropdown, Avatar, Tooltip, Input } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  EllipsisOutlined,
  UserOutlined,
  PhoneOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import "./tripHeading.css";

interface TripHeaderProps {
  tripFrom: string;
  tripTo: string;
}

const TripHeading: React.FC<TripHeaderProps> = ({ tripFrom, tripTo }) => {
  const [tripName, setTripName] = useState("Trip 1");
  const [shouldEdit, setShouldEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onEditName = () => {
    setShouldEdit(true);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShouldEdit(false);
    }
  };

  const handleFocus = () => {
    if (shouldEdit && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menu = (
    <Menu className="custom-menu">
      <Menu.Item key="1" icon={<UserOutlined className="iconSize" />}>
        Members
      </Menu.Item>
      <Menu.Item key="2" icon={<PhoneOutlined className="iconSize" />}>
        Share Number
      </Menu.Item>
      <Menu.Item key="3" icon={<WarningOutlined className="iconSize" />}>
        Report
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="trip-card" onClick={handleFocus}>
      <div className="header">
        <div className="title">
          <ArrowLeftOutlined className="icon" />
          <Input
            className="custom-input"
            value={tripName}
            ref={(input) => {
              // Store the underlying input element
              inputRef.current = input?.input; // Access the input element directly
            }}
            onChange={(e) => setTripName(e.target.value)}
            disabled={!shouldEdit}
          />
        </div>
        <div>
          <div onClick={onEditName}>
            <EditOutlined className="right" />
          </div>
        </div>
      </div>

      <div className="trip-info">
        <Avatar.Group
          max={{
            count: 2,
            style: { color: "#f56a00", backgroundColor: "#fde3cf" },
          }}
        >
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
              }
            />
          </Tooltip>
          <Avatar
            style={{ backgroundColor: "#1677ff" }}
            icon={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=4" />
            }
          />
        </Avatar.Group>
        <div className="trip-details">
          <p>
            From <strong>{tripFrom}</strong>
          </p>
          <p>
            To <strong>{tripTo}</strong>
          </p>
        </div>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
          arrow
        >
          <EllipsisOutlined className="menu-icon" />
        </Dropdown>
      </div>

      <div className="trip-date">
        <span>12 JAN, 2023</span>
      </div>
    </div>
  );
};

export default TripHeading;
