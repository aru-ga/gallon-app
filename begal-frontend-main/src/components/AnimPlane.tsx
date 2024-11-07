import Lottie from "lottie-react";
import animationData from "@/assets/Animation5.json";

const AnimPlane = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimPlane;
