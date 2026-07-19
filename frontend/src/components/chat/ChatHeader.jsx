import { assets } from "../../assets/assets";
const ChatHeader = ({ setShowChat, admin, connected }) => {
  const handleClick = () => {
    setShowChat(false);
  };
  return (
    <>
      <p
        onClick={handleClick}
        className="absolute right-3 top-1 cursor-pointer hover:scale-110 px-2 rounded-full hover:bg-purple-700 "
      >
        x
      </p>

      <div className=" px-4 py-3 border-b flex items-center bg-purple-500 text-black rounded-t-xl gap-3">
        <div className="relative">
          <img
            src={admin?.avatar || assets.user_img}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          {connected ? (
            <p className=" absolute top-0 bg-green-600 border border-white  z-51 rounded-full w-2 p-1.5 h-2"></p>
          ) : (
            <p className=" absolute top-0 bg-gray-800 border border-white  z-51 rounded-full w-2 p-1.5 h-2"></p>
          )}
        </div>

        <div className="flex-1">
          <div className="font-semibold">{admin?.fullName || "Admin"}</div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
