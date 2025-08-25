import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const API = "http://localhost:5000";

const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

export default function ChatPage() {
  const [me, setMe] = useState(null);  
  const [admin, setAdmin] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [connected, setConnected] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const convRes = await axios.get(`${API}/api/chat/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!convRes.data?.success) return;
        const { conversationId: cid, admin: adminUser } = convRes.data.data;
        setConversationId(cid);
        setAdmin(adminUser);

        const his = await axios.get(`${API}/api/chat/messages/${cid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(his.data.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const s = io(API, {
      auth: { token },
      transports: ["websocket"],
    });
    socketRef.current = s;

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));

    s.on("message:new", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("message:read", ({ conversationId: cid }) => {
      if (cid !== conversationId) return;
      setMessages((prev) =>
        prev.map((m) => (m.receiver && m.receiver._id ? m : m))
      );
      (async () => {
        try {
          const token = localStorage.getItem("token");
          const his = await axios.get(`${API}/api/chat/messages/${conversationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMessages(his.data.data || []);
        } catch {}
      })();
    });

    return () => s.disconnect();
  }, [conversationId]);

  const myId = useMemo(() => {
    try {
      const raw = localStorage.getItem("user"); 
      return raw ? JSON.parse(raw)?._id : null;
    } catch {
      return null;
    }
  }, []);

  const send = () => {
    if (!text.trim() || !socketRef.current || !conversationId || !admin) return;
    socketRef.current.emit("message:send", {
      conversationId,
      to: admin._id,
      text,
    });
    setText("");
  };

  const lastMyMsg = [...messages].reverse().find((m) => m.sender?._id === myId);

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-90px)] flex flex-col border rounded-xl bg-white">
      <div className="px-4 py-3 border-b flex items-center gap-3">
        <img
          src={admin?.avatar || "/fallback-avatar.png"}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold">{admin?.fullName || "Admin"}</div>
          <div className="text-xs text-gray-500">{connected ? "Đang trực tuyến" : "Ngoại tuyến"}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => {
          const mine = m.sender?._id === myId;
          return (
            <div key={m._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              {!mine && (
                <img
                  src={m.sender?.avatar || "/fallback-avatar.png"}
                  className="w-8 h-8 rounded-full mr-2 self-end object-cover"
                />
              )}
              <div className={`max-w-[70%] rounded-2xl px-3 py-2 ${mine ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>
                <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                <div className={`text-[11px] mt-1 ${mine ? "text-indigo-200" : "text-gray-500"}`}>
                  {fmtTime(m.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="px-3 pb-2">
        {lastMyMsg && (
          <div className="text-xs text-gray-500 mb-1 text-right">
            {lastMyMsg.readAt ? "ĐÃ XEM" : "ĐÃ GỬI"}
          </div>
        )}
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Nhập tin nhắn..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            onClick={send}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
            disabled={!text.trim()}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
