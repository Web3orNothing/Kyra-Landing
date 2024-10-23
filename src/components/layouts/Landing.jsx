import { Link } from "react-router-dom";
import Title from "../common/Title";
import Content from "./Content";
import SocialGroup from "./SocialGroup";

const shortenAddress = (address, chars) => {
  if (address) return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export default function Landing() {
  return (
    <>
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[310px]">
        <Title />
        <div className="flex items-center justify-center">
          <span className="text-[15px] sm:text-xl font-[gridlite] text-white">
            CA: 0x0000000000000000000000000000000000000000
          </span>
        </div>
        <Content />
        <SocialGroup />
      </div>
      <Link to={`mailto:kyraevolves@proton.me`}>
        <span className="absolute bottom-5 flex justify-center m-auto items-center left-1/2 -translate-x-1/2 text-white font-[gridlite] font-semibold text-xl">
          kyraevolves@proton.me
        </span>
      </Link>
    </>
  );
}
