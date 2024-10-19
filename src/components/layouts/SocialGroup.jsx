import SocialItem from "../common/Social";

export default function SocialGroup() {
  return (
    <div
      className="grid space-x-4 mt-5 overflow-hidden"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
    >
      <SocialItem title={"Twitter"} />
      <SocialItem title={"Telegram"} />
      <SocialItem title={"Discord"} />
    </div>
  );
}
