import Marquee from "react-fast-marquee";
import MarqueeOne from "./marquee-contents/MarqueeOne";
const MarqueeSection = () => {
  return (
    <Marquee>
      <div className="flex pt-24 px-[6%] pb-8">
        <MarqueeOne />
      </div>
    </Marquee>
  );
};

export default MarqueeSection;
