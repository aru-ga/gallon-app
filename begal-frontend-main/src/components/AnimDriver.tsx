import Lottie from "lottie-react";
import animationData from "@/assets/Animation4.json";

const AnimDriver = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimDriver;
