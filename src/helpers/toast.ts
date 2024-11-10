import { ReactNode } from "react";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";

export const triggerToast = (
  content: ReactNode | string,
  design: "default" | "success" | "error" | "warning" = "default",
) => {
  let className = "p-4 rounded-md shadow-md font-medium";
  if (design === "success") {
    className += " bg-green-500 text-white";
  } else if (design === "error") {
    className += " bg-red-500 text-white";
  } else if (design === "warning") {
    className += " bg-yellow-500 text-white";
  } else {
    className += " bg-white text-black";
  }

  toast(content, {
    duration: 3000,
    className,
    position: "top-center",
  });
};
