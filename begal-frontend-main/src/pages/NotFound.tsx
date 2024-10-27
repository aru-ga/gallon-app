import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      Seems like you got Lost, <Link to="/" className="ml-1 text-blue-500 font-semibold">Go back Home</Link>
    </div>
  );
}
