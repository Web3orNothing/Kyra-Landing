export default function SocialItem({ title, link }) {
  return (
    <a href={link} target="_blank">
      <div className="border-white font-[gridlite] font-semibold text-[15px] sm:text-[20px] items-center flex justify-center bg-black hover:opacity-70 opacity-95 border-[2px] rounded-sm h-[50px] p-3 text-center text-white">
        {title}
      </div>
    </a>
  );
}
