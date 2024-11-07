import Lottie from "lottie-react";
import animationData from "@/assets/Animation3.json";

const AnimSetNew = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimSetNew;
