import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";

interface PasswordFieldProps {
  setPassword: Dispatch<SetStateAction<string>>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ setPassword }) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <div className="flex items-center border px-3 py-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 ">
      <input
        placeholder="Password"
        type={isShowingPassword ? "text" : "password"}
        className="flex-1 outline-none bg-gray-50"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setIsShowingPassword((prev) => !prev)}
      >
        {isShowingPassword ? (
          <IoMdEye className="text-gray-500 w-[20px] h-[20px]" />
        ) : (
          <IoMdEyeOff className="text-gray-500 w-[20px] h-[20px]" />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
