import { Loader2 } from "lucide-react";
import React from "react";

function Loader() {
  return (
    <div className="h-screen grid place-items-center uppercase text-center">
      <div>
        <Loader2 size={24} className="animate-spin mx-auto" />
        <p className="text-sm mt-3">Please Wait...</p>
      </div>
    </div>
  );
}

export default Loader;
