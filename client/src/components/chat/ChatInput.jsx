const ChatInput = ({ send, lastMyMsg, text }) => {
  return (
    <>
      <div className="px-3 pb-2">
        {lastMyMsg && (
          <div className="text-xs text-gray-500 mb-1 text-right">
            {lastMyMsg.readAt ? "ĐÃ XEM" : "ĐÃ GỬI"}
          </div>
        )}
        <div className=" hover:border-blue-600 border  rounded-lg flex gap-2 focus:border-blue-600">
          <input
            className="flex-1  px-3 py-2 outline-none "
            placeholder="Nhập tin nhắn..."
            // value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            onClick={send}
            className="px-4  rounded-r-lg bg-purple-700 hover:bg-purple-800 "
            disabled={!text.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
