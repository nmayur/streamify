import { BLUR_FADE_DELAY } from "@/shared/constants";
import BlurFade from "../magicui/blur-fade";

const Header = ({ className }: { className?: string }) => {
  return (
    <>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <header className="w-full py-4 text-white md:mb-4 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-thin">
            Welcome to <span className="font-medium">Streamify</span> Analytics
          </h1>
        </header>
      </BlurFade>
    </>
  );
};

export default Header;
