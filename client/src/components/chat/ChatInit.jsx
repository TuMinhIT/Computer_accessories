const ChatInit = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm  p-6 text-center">
        {/* Header */}
        <div className="bg-purple-700 text-white rounded-xl p-4 mb-4">
          <h2 className="text-xl font-bold">Xin chào!</h2>
          <p className="text-sm">Rất vui khi được hỗ trợ bạn</p>
        </div>

        {/* Nội dung */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium">
            Bắt đầu trò chuyện với{" "}
            <span className="text-purple-700 font-bold">Admin</span>
          </p>
        </div>

        {/* Nút chat */}
        <button className="w-full bg-purple-700 text-white py-2 rounded-xl hover:bg-purple-800 transition">
          Chat
        </button>
      </div>
    </div>
  );
};

export default ChatInit;
