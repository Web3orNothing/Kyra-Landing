import { Link } from "react-router-dom";

import Title from "../common/Title";
import Content from "./Content";
import SocialGroup from "./SocialGroup";

// const shortenAddress = (address, chars) => {
//   if (address) return `${address.slice(0, chars)}...${address.slice(-chars)}`;
// };

export default function Landing() {
  return (
    <>
      <div className="w-screen flex justify-center items-center px-0 mx-0 bg-white">
        <div className="absolute px-4 top-[55%] md:top-[45%] md:left-1/2 md:-translate-x-1/2 -translate-y-[55%] md:-translate-y-[47%] min-w-[310px]">
          <div className="grid grid-cols-5 gap-2 space-y-8 items-center">
            <div className="col-span-5 md:col-span-5 px-2 py-4 ">
              <Title />

              <div className="flex items-center justify-center">
                <Link
                  to={
                    "https://etherscan.io/address/0x4B41A481a7A3E0396751aA49BEe970B842FdAedE"
                  }
                  target="_blank"
                >
                  <span className="text-[10px] md:text-[15px] sm:text-xl font-[gridlite] text-white">
                    CA: 0x4B41A481a7A3E0396751aA49BEe970B842FdAedE
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Content />
          </div>
          <div className="mt-8 md:mt-0">
            <SocialGroup />
          </div>
        </div>
        <Link to={`mailto:kyraevolves@proton.me`}>
          <span className="absolute bottom-5 flex justify-center m-auto items-center left-1/2 -translate-x-1/2 text-white font-[gridlite] font-semibold text-xl">
            kyraevolves@proton.me
          </span>
        </Link>
      </div>
    </>
  );
}
