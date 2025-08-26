import { useRef } from "react";

const ChatBody = ({ messages, bottomRef }) => {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => {
          const mine = m.sender?._id === myId;
          return (
            <div
              key={m._id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              {!mine && (
                <img
                  src={m.sender?.avatar || "/fallback-avatar.png"}
                  className="w-8 h-8 rounded-full mr-2 self-end object-cover"
                />
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-3 py-2 ${mine ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
              >
                <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                <div
                  className={`text-[11px] mt-1 ${mine ? "text-indigo-200" : "text-gray-500"}`}
                >
                  {fmtTime(m.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </>
  );
};

export default ChatBody;
