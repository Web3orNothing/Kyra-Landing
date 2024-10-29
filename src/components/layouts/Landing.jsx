import { Link } from "react-router-dom";

import Title from "../common/Title";
import Content from "./Content";
import SocialGroup from "./SocialGroup";
import GlowingCard from "../common/GlowingCard";
import FractalScene from "../common/FractalScene";

// const shortenAddress = (address, chars) => {
//   if (address) return `${address.slice(0, chars)}...${address.slice(-chars)}`;
// };

export default function Landing() {
  return (
    <>
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[310px]">
        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-5 md:col-span-4 px-2 py-4 ">
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
          <GlowingCard>
            <div className="colspan-1 content-card px-2 py-4 bg-black h-[160px] hidden md:block">
              <FractalScene />
            </div>
          </GlowingCard>
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
