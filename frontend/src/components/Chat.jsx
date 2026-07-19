import { useState } from "react";
import { toast } from "react-toastify";
import ChatPage from "../pages/ChatPage";

const Chat = () => {
  const [visible, setVisible] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const handleOpen = () => {
    setVisible(!visible);
  };

  const handleChatClick = () => {
    setShowChat(!showChat);
  };
  return (
    <>
      {showChat && <ChatPage setShowChat={setShowChat} />}
      <div className="gap-3 flex flex-col fixed z-10  top-[50%] right-3  overflow-hidden  transition-all duration-300 ease-linear">
        <div
          onClick={handleOpen}
          className={`${visible ? "rotate-180" : "flex"}
                   hover:scale-110 mr-2 rounded-full mb-3 justify-center p-1 `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#000000"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </div>
        {visible && (
          <>
            <div
              onClick={handleChatClick}
              className="border hover:bg-amber-100  border-gray-50 p-2 rounded-full bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#0000F5"
              >
                <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
