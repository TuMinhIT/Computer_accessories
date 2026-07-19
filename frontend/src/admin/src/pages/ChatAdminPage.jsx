// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const API = "http://localhost:5000";

// const fmtTime = (iso) =>
//   new Date(iso).toLocaleString("vi-VN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     day: "2-digit",
//     month: "2-digit",
//   });

// export default function ChatAdminPage() {
//   const [conversations, setConversations] = useState([]);
//   const [currentConv, setCurrentConv] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const socketRef = useRef(null);
//   const bottomRef = useRef(null);

//   // Auto scroll xuống cuối khi có tin nhắn mới
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Load danh sách hội thoại khi mount
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const res = await axios.get(`${API}/api/chat/conversations`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data?.success) {
//           setConversations(res.data.data);
//         }
//       } catch (err) {
//         console.error("❌ load conversations error:", err);
//       }
//     };
//     fetchConversations();
//   }, []);

//   // Kết nối socket CHỈ 1 LẦN
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const s = io(API, {
//       path: "/socket.io",
//       auth: { token },
//       transports: ["websocket"],
//       reconnection: true,
//     });

//     socketRef.current = s;

//     s.on("connect", () => console.log("✅ Socket connected:", s.id));
//     s.on("disconnect", (reason) => console.log("❌ Socket disconnected:", reason));
//     s.on("connect_error", (err) => console.error("⚠️ connect_error:", err.message));

//     // Nhận tin nhắn mới
//     s.on("message:new", (msg) => {
//       // Nếu đang mở đúng conversation thì append message
//       setMessages((prev) =>
//         currentConv && msg.conversation === currentConv.conversationId
//           ? [...prev, msg]
//           : prev
//       );

//       // Cập nhật preview ở sidebar
//       setConversations((prev) =>
//         prev.map((c) =>
//           c.conversationId === msg.conversation
//             ? { ...c, lastMessage: msg.text, lastMessageAt: msg.createdAt }
//             : c
//         )
//       );
//     });

//     // Có thể lắng nghe sự kiện read nếu backend phát
//     s.on("message:read", ({ conversationId }) => {
//       if (currentConv?.conversationId !== conversationId) return;
//       // tuỳ ý fetch lại cho chắc
//       // (có thể tối ưu bằng cách set readAt cho các message nhận)
//     });

//     return () => {
//       s.removeAllListeners();
//       s.disconnect();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // <--- quan trọng: không phụ thuộc currentConv

//   // Mở 1 hội thoại => load messages + mark seen
//   const openConversation = async (conv) => {
//     setCurrentConv(conv);
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.get(`${API}/api/chat/messages/${conv.conversationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(res.data.data || []);

//       // Đánh dấu đã xem
//       await axios.post(
//         `${API}/api/chat/seen`,
//         { conversationId: conv.conversationId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error("❌ openConversation error:", err);
//     }
//   };

//   // Gửi tin nhắn
//   const send = () => {
//     if (!text.trim() || !currentConv || !socketRef.current) return;
//     socketRef.current.emit("message:send", {
//       conversationId: currentConv.conversationId,
//       to: currentConv.employee._id,
//       text,
//     });
//     setText("");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar: danh sách conv */}
//       <div className="w-1/3 border-r overflow-y-auto">
//         <h2 className="p-3 font-bold text-lg">Chats</h2>
//         {conversations.map((c) => (
//           <div
//             key={c.conversationId}
//             className={`p-3 border-b hover:bg-gray-100 cursor-pointer ${
//               currentConv?.conversationId === c.conversationId ? "bg-gray-100" : ""
//             }`}
//             onClick={() => openConversation(c)}
//           >
//             <div className="flex items-center gap-2">
//               <img
//                 src={c.employee?.avatar || "/fallback-avatar.png"}
//                 className="w-10 h-10 rounded-full object-cover"
//                 alt=""
//               />
//               <div>
//                 <div className="font-medium">{c.employee?.fullName}</div>
//                 <div className="text-xs text-gray-500 truncate">
//                   {c.lastMessage || "Chưa có tin nhắn"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Khung chat */}
//       <div className="flex-1 flex flex-col">
//         {currentConv ? (
//           <>
//             <div className="border-b p-3 font-semibold">
//               {currentConv.employee?.fullName}
//             </div>

//             <div className="flex-1 overflow-y-auto p-3 space-y-2">
//               {messages.map((m) => {
//                 const mine = m.sender?.role === "admin";
//                 return (
//                   <div
//                     key={m._id}
//                     className={`flex ${mine ? "justify-end" : "justify-start"}`}
//                   >
//                     {!mine && (
//                       <img
//                         src={m.sender?.avatar || "/fallback-avatar.png"}
//                         className="w-8 h-8 rounded-full mr-2 self-end object-cover"
//                         alt=""
//                       />
//                     )}
//                     <div
//                       className={`max-w-[70%] rounded-2xl px-3 py-2 ${
//                         mine ? "bg-indigo-600 text-white" : "bg-gray-100"
//                       }`}
//                     >
//                       <div className="text-sm">{m.text}</div>
//                       <div className="text-[11px] mt-1">{fmtTime(m.createdAt)}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={bottomRef} />
//             </div>

//             <div className="p-3 border-t flex gap-2">
//               <input
//                 className="flex-1 border rounded-lg px-3 py-2"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && send()}
//                 placeholder="Nhập tin nhắn..."
//               />
//               <button className="bg-indigo-600 text-white px-4 rounded-lg" onClick={send}>
//                 Gửi
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Chọn một cuộc trò chuyện
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API = "http://localhost:5000";

const fmtTime = (iso) =>
  new Date(iso).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });

export default function ChatAdminPage() {
  const [conversations, setConversations] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // load list conv
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API}/api/chat/conversations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setConversations(res.data.data);
      } catch (err) {
        console.error("❌ load conversations error:", err);
      }
    };
    fetchConversations();
  }, []);

  // socket connect (1 lần)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const s = io(API, {
      path: "/socket.io",
      auth: { token },
      transports: ["websocket"],
    });
    socketRef.current = s;

    s.on("connect", () => console.log("✅ Socket connected:", s.id));
    s.on("connect_error", (err) => console.error("⚠️ connect_error:", err.message));
    s.on("disconnect", () => console.log("❌ Socket disconnected"));

    s.on("message:new", (msg) => {
      if (msg.conversation === currentConv?.conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
      setConversations((prev) =>
        prev.map((c) =>
          c.conversationId === msg.conversation
            ? { ...c, lastMessage: msg.text, lastMessageAt: msg.createdAt }
            : c
        )
      );
    });

    return () => s.disconnect();
  }, [currentConv]);

  const openConversation = async (conv) => {
    setCurrentConv(conv);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/api/chat/messages/${conv.conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.data);

      await axios.post(
        `${API}/api/chat/seen`,
        { conversationId: conv.conversationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("❌ openConversation error:", err);
    }
  };

  const send = () => {
    if (!text.trim() || !currentConv) return;
    socketRef.current.emit("message:send", {
      conversationId: currentConv.conversationId,
      to: currentConv.employee._id,
      text,
    });
    setText("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto">
        <h2 className="p-3 font-bold text-lg">Chats</h2>
        {conversations.map((c) => (
          <div
            key={c.conversationId}
            className={`p-3 border-b hover:bg-gray-100 cursor-pointer ${
              currentConv?.conversationId === c.conversationId ? "bg-gray-100" : ""
            }`}
            onClick={() => openConversation(c)}
          >
            <div className="flex items-center gap-2">
              <img
                src={c.employee?.avatar || "/fallback-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{c.employee?.fullName}</div>
                <div className="text-xs text-gray-500 truncate">
                  {c.lastMessage || "Chưa có tin nhắn"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat box */}
      <div className="flex-1 flex flex-col">
        {currentConv ? (
          <>
            <div className="border-b p-3 font-semibold">
              {currentConv.employee?.fullName}
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((m) => {
                const mine = m.sender?.role === "admin";
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
                      className={`max-w-[70%] rounded-2xl px-3 py-2 ${
                        mine ? "bg-indigo-600 text-white" : "bg-gray-100"
                      }`}
                    >
                      <div className="text-sm">{m.text}</div>
                      <div className="text-[11px] mt-1">{fmtTime(m.createdAt)}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t flex gap-2">
              <input
                className="flex-1 border rounded-lg px-3 py-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Nhập tin nhắn..."
              />
              <button
                className="bg-indigo-600 text-white px-4 rounded-lg"
                onClick={send}
              >
                Gửi
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Chọn một cuộc trò chuyện
          </div>
        )}
      </div>
    </div>
  );
}
