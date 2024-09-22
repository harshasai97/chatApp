import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Spin } from "antd";
import InputWithIcons from "../InputIcons/inputIcons.tsx";
import { TripHeading } from "../TripHeading/index.ts";
import "./chatScreen.css";
import {
  CheckCircleFilled,
  CopyOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import useLongPress from "../customHooks/longPress.tsx";
interface Sender {
  image: string;
  is_kyc_verified: boolean;
  self: boolean;
  user_id: string;
}

interface ChatMessage {
  id: string;
  message: string;
  sender: Sender;
  time: string;
}

const ChatComponent: React.FC = () => {
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tripFrom, setTripfrom] = useState("");
  const [tripTo, setTripTo] = useState("");
  const [selected, setSelected] = useState(false);
  const [showCopyMenu, setShowCopyMenu] = useState("");
  const textToCopy = "This is the text to copy!";
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleLongPress = (current: string) => {
    setShowCopyMenu(current);
    console.log("Long press detected!", current);
  };

  const handleCopy = (chatMsg, chat) => {
    console.log(chat);
    navigator.clipboard
      .writeText(chatMsg)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
    setShowCopyMenu(false);
  };

  const handleCancel = () => {
    setShowCopyMenu(false);
  };

  const longPressEvents = useLongPress(handleLongPress, 500);

  // Fetch chat data from API
  const fetchChatData = async (page: number) => {
    console.log("fetching chat data:", page);
    try {
      setLoading(true);
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${page}`
      );
      const newData = response.data.chats;

      setChatData((prevData) => [...newData, ...prevData]);
      if (!page) {
        setTripfrom(response.data.from);
        setTripTo(response.data.to);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchChatData(0);
  }, []);

  // Handle scrolling to the top to load more data
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;
      if (scrollTop === 0 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  // Fetch new page of data when the page number changes
  useEffect(() => {
    if (page > 0) {
      fetchChatData(page);
    }
  }, [page]);

  //To format time
  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <div className="chat-screen" {...longPressEvents}>
      <TripHeading tripFrom={tripFrom} tripTo={tripTo} />
      <div
        className="chat-container"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {loading ? (
          <Spin />
        ) : (
          <div className="chat-content">
            {chatData.map((chat) => (
              <div
                {...longPressEvents}
                onMouseDown={() => longPressEvents.onMouseDown(chat.id)}
                onTouchStart={() => longPressEvents.onTouchStart(chat.id)}
                key={chat.id}
                className={
                  chat.sender.self ? "chat-message self" : "chat-message"
                }
              >
                {!chat.sender.self && (
                  <div className="sender-image-content">
                    <img src={chat.sender.image} alt="Sender" />
                    {chat.sender.is_kyc_verified && (
                      <CheckCircleFilled className="sender-image-verified" />
                    )}
                  </div>
                )}
                <div>
                  <div className="message-content">
                    {chat.message}
                    {showCopyMenu === chat.id && (
                      <div className="copy-menu">
                        <button onClick={() => handleCopy(chat.message, chat)}>
                          <CopyOutlined className="copyIcons" />
                        </button>
                        <button className="cancel" onClick={handleCancel}>
                          <CloseCircleOutlined className="copyIcons" />
                        </button>
                      </div>
                    )}
                    <div className="message-time">{formatTime(chat.time)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <InputWithIcons />
    </div>
  );
};

export default ChatComponent;
