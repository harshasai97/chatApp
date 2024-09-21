import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
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
  const menu = (
    <Menu className="custom-menu">
      <Menu.Item key="1" icon={<UserOutlined />}>
        Members
      </Menu.Item>
      <Menu.Item key="2" icon={<PhoneOutlined />}>
        Share Number
      </Menu.Item>
      <Menu.Item key="3" icon={<WarningOutlined />}>
        Report
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="trip-card">
      <div className="header">
        <ArrowLeftOutlined className="icon" />
        <span className="title">Trip 1</span>
        <EditOutlined className="icon right" />
      </div>

      <div className="trip-info">
        <Avatar.Group size="large">
          <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
          <Avatar src="https://randomuser.me/api/portraits/men/40.jpg" />
          <Avatar src="https://randomuser.me/api/portraits/men/33.jpg" />
          <Avatar src="https://randomuser.me/api/portraits/men/29.jpg" />
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
