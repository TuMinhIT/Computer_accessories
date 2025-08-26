import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { assets } from "../assets/assets";
import ChatHeader from "../components/chat/ChatHeader";
import ChatBody from "../components/chat/ChatBody";
import ChatInit from "../components/chat/ChatInit";
import ChatInput from "../components/chat/ChatInput";

const API = "http://localhost:5000";

const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ChatPage({ setShowChat }) {
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
          const his = await axios.get(
            `${API}/api/chat/messages/${conversationId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
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
    <div className="top-5 right-5 z-50 fixed max-w-xl w-auto min-w-96 h-[calc(100vh-90px)] flex flex-col border rounded-xl bg-white">
      <ChatHeader
        setShowChat={setShowChat}
        admin={admin}
        connected={connected}
      />
      <ChatInit />
      <ChatBody messages={messages} bottomRef={bottomRef} />
      <ChatInput send={send} lastMyMsg={lastMyMsg} text={text} />
    </div>
  );
}
