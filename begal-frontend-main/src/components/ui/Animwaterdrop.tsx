import Lottie from "lottie-react";
import animationData from "@/assets/AnimWaterdrop.json";

const AnimWaterdrop = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimWaterdrop;
