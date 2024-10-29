import GlowingCard from "./GlowingCard";
export default function SocialItem({ title, link }) {
  return (
    <a href={link} target="_blank">
      <GlowingCard>
        <div className="content-card font-[gridlite] font-semibold text-[15px] sm:text-[20px] items-center flex justify-center bg-black hover:opacity-95 opacity-100 ] h-[50px] p-3 text-center text-white">
          {title}
        </div>
      </GlowingCard>
    </a>
  );
}
