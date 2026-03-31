"use client";

import { useEffect, useState } from "react";

interface Message {
  id: number;
  content: string;
  created_at: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 加载留言列表
  async function loadMessages() {
    const res = await fetch("/api/messages");
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  }

  // 提交新留言
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || submitting) return;

    setSubmitting(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newMessage }),
    });

    if (res.ok) {
      setNewMessage("");
      loadMessages();
    }
    setSubmitting(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">留言板</h1>

        {/* 提交留言 */}
        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="写下你想说的话..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {submitting ? "提交中..." : "发送"}
          </button>
        </form>

        {/* 留言列表 */}
        <div className="space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">还没有留言，来写第一条吧！</p>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-800">{msg.content}</p>
              <p className="text-gray-400 text-sm mt-2">
                {new Date(msg.created_at).toLocaleString("zh-CN")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
