import Lottie from "lottie-react";
import animationData from "@/assets/Animation2.json";

const AnimForgotPassword = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimForgotPassword;
