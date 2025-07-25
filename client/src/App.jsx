import { assets } from "./assets/frontend-assets/assets";

function App() {
  return (
    <div className="bg-gray-700 h-screen text-white text-4xl  flex flex-row">
      <img className="w-1/2 rounded-4xl" src={assets.background} alt="" />
      <div className=" flex m-auto">hello Hoang Anh Gảy</div>
    </div>
  );
}

export default App;
