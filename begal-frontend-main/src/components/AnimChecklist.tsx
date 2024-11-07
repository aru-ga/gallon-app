import Lottie from "lottie-react";
import animationData from "@/assets/Animation1.json";

const AnimChecklist = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimChecklist;
