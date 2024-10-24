import SocialItem from "../common/Social";

export default function SocialGroup() {
  return (
    <div
      className="grid space-x-4 mt-5 overflow-hidden"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
    >
      <SocialItem title={"Telegram"} link={"https://t.me/kyraevolves"} />
      <SocialItem title={"X"} link={"https://x.com/kyraevolves"} />
      <SocialItem
        title={"Dextools"}
        link={
          "https://www.dextools.io/app/en/ether/pair-explorer/0x28cc964cfb20bc68a5a3a6b6322b26b568feebc9?t=1729802214505"
        }
      />
    </div>
  );
}
