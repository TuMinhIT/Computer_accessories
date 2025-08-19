import { assets } from "../assets/assets";

const Title = ({ text }) => {
  return (
    <div className="flex justify-center">
      <div className="p-5 sm:p-10 prata-regular text-4xl justify-center flex-row">
        <div className="flex">
          <b>{text}</b>
          {/* <img className="ml-5" src={assets.sell} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Title;
