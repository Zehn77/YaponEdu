import React, { ReactNode } from "react";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import Sitebar from "./sitebar/Sitebar";
import { useDispatch } from "react-redux";
import { signOut } from "../store/authSlice";
import { toast } from "react-toastify";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }} className="">
      <Sitebar collapsed={collapsed} />
      <div style={{ flex: 1 }} className="bg-gray-100">
        <nav className="flex justify-between px-5 py-3 sticky top-0 bg-gray-200 z-10">
          <button className="" onClick={() => setCollapsed(!collapsed)}>
            <IoMenu className="w-6 h-6" />
          </button>
          <span className="relative group">
            <IoPersonCircleSharp className="w-6 h-6" />
            <button
              onClick={() => {
                dispatch(signOut());
                toast.success("Siz tizimdan muvaffaqqiyatli chiqdingiz!");
              }}
              className="w-[100px] border border-gray-300 text-sm absolute text-red-500 font-bold right-0 mt-2 p-2 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Log Out
            </button>
          </span>
        </nav>
        <hr />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
