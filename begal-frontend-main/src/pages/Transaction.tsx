import Navbar from "@/components/Navbar";
import { useLocation } from "react-router-dom";

export default function Transaction() {
  const location = useLocation();
  return (
    <>
      <Navbar activePath={location.pathname} />
      <div>Transaction</div>
    </>
  );
}
