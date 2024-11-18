import Lottie from "lottie-react";
import animationData from "@/assets/Animation6.json";

const AnimTransUnlog = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimTransUnlog;
