import SocialItem from "../common/Social";

export default function SocialGroup() {
  return (
    <div className="grid grid-cols-3 gap-8 mb-32 md:mb-0 md:mt-5 py-0 md:min-h-[200px]">
      <SocialItem title="Telegram" link="https://t.me/kyraevolves" />
      <SocialItem title="X" link="https://x.com/kyraevolves" />
      <SocialItem
        title="Dextools"
        link="https://www.dextools.io/app/en/ether/pair-explorer/0x28cc964cfb20bc68a5a3a6b6322b26b568feebc9?t=1729802214505"
      />
    </div>
  );
}
