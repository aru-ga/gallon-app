import Lottie from "lottie-react";
import animationData from "@/assets/AnimNoTrans.json";

const AnimNoTrans = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimNoTrans;
