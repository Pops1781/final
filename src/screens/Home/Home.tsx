console.log("Home component loaded");
import { FrameWrapperByAnima } from "./sections/FrameWrapperByAnima/FrameWrapperByAnima";
import { FrameByAnima } from "./sections/FrameByAnima";
import { DivWrapperByAnima } from "./sections/DivWrapperByAnima";

export const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-[26px] pb-20" style={{ background: '#e2e2e2' }}>
      <FrameWrapperByAnima />
      <FrameByAnima />
      <DivWrapperByAnima />
    </div>
  );
};
