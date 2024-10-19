import Button from "../common/Button";
import Title from "../common/Title";
import Content from "./Content";
import SocialGroup from "./SocialGroup";

export default function Landing() {
  return (
    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[320px]">
      <Title />
      <Content />
      <SocialGroup />
      <Button />
    </div>
  );
}
