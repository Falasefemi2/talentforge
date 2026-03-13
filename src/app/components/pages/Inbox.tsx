import { useState } from "react";
import {
  Mail,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface Message {
  id: number;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  category: "application" | "interview" | "offer" | "general";
}

export function Inbox() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "Michael Chen",
      subject: "Application for Senior .NET Developer Position",
      preview:
        "Thank you for considering my application. I am very excited about the opportunity to...",
      timestamp: "10:30 AM",
      isRead: false,
      isStarred: true,
      category: "application",
    },
    {
      id: 2,
      from: "David Kim",
      subject: "Re: Interview Confirmation - Tech Lead Position",
      preview:
        "I confirm my availability for the interview on October 24th at 2:00 PM...",
      timestamp: "9:15 AM",
      isRead: false,
      isStarred: false,
      category: "interview",
    },
    {
      id: 3,
      from: "Elena Rodriguez",
      subject: "Offer Acceptance - Product Manager Role",
      preview:
        "I am delighted to accept the offer for the Product Manager position. I look forward to...",
      timestamp: "Yesterday",
      isRead: true,
      isStarred: true,
      category: "offer",
    },
    {
      id: 4,
      from: "Sarah Jones",
      subject: "Portfolio Submission for UX Designer Role",
      preview:
        "As requested, I am attaching my design portfolio for your review. The projects showcase...",
      timestamp: "Yesterday",
      isRead: true,
      isStarred: false,
      category: "application",
    },
    {
      id: 5,
      from: "James Wilson",
      subject: "Question about Backend Developer Position",
      preview:
        "I have a few questions regarding the tech stack and team structure for the Backend...",
      timestamp: "2 days ago",
      isRead: true,
      isStarred: false,
      category: "general",
    },
  ]);

  const toggleStar = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg,
      ),
    );
  };

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
    );
  };

  const filteredMessages =
    selectedCategory === "all"
      ? messages
      : messages.filter((msg) => msg.category === selectedCategory);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "application":
        return "bg-teal-100 text-teal-700";
      case "interview":
        return "bg-purple-100 text-purple-700";
      case "offer":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Inbox</h1>
          <p className="text-gray-600">
            Manage candidate communications and inquiries.
          </p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <Mail className="w-5 h-5" />
          Compose
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">TOTAL MESSAGES</div>
          <div className="text-3xl font-semibold text-gray-900">
            {messages.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">UNREAD</div>
          <div className="text-3xl font-semibold text-teal-600">
            {unreadCount}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">STARRED</div>
          <div className="text-3xl font-semibold text-orange-600">
            {messages.filter((m) => m.isStarred).length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">RESPONSE RATE</div>
          <div className="text-3xl font-semibold text-emerald-600">94%</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-4 mb-6">
        {["all", "application", "interview", "offer", "general"].map(
          (category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                selectedCategory === category
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ),
        )}
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => markAsRead(message.id)}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                !message.isRead ? "bg-teal-50" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Star */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(message.id);
                  }}
                  className="mt-1"
                >
                  <Star
                    className={`w-5 h-5 ${
                      message.isStarred
                        ? "text-orange-500 fill-orange-500"
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                  />
                </button>

                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    !message.isRead ? "bg-teal-600" : "bg-gray-400"
                  }`}
                >
                  {message.from
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-medium ${!message.isRead ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {message.from}
                      </span>
                      <Badge
                        className={`${getCategoryColor(message.category)} border-0 text-xs`}
                      >
                        {message.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={`mb-1 ${!message.isRead ? "font-semibold text-gray-900" : "text-gray-700"}`}
                  >
                    {message.subject}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {message.preview}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Reply className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Archive className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No messages in this category.</p>
        </div>
      )}
    </div>
  );
}
