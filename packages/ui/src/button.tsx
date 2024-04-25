"use client";

import { ReactNode } from "react";

type buttonType = "default" | "submit" | "cancel" | "processing";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: buttonType
}

export const Button = ({ onClick, children, type }: ButtonProps) => {
  type = type || "default";
  return (
    <div>
      {type === "default" ? <button 
        onClick={onClick} 
        className="bg-vi hover:bg-gray-500 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
        >
        {children}
      </button>: null}
      {type === "submit" ? 
        <button 
          onClick={onClick} 
          className="bg-vi hover:bg-black text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
        > {children}
        </button> : null
      }
      {type === "cancel" ? 
        <button 
          onClick={onClick} 
          className="bg-gray-400 hover:bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
        > {children}
        </button> : null
      }
      {type === "processing" ? 
        <button 
          onClick={onClick} 
          className="bg-yellow-600 hover:bg-gray-500 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
        > {children}
        </button> : null
      }
    </div>
  );
};

