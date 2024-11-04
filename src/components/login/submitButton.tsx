import { ClipLoader } from "react-spinners";
import clsx from "clsx";

interface SubmitButtonProps {
  disabled: boolean;
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, isLoading }) => {
  return (
    <>
      <div className="px-5">
        <button
          disabled={disabled}
          type="submit"
          className={clsx(
            "w-full text-md bg-[#4361EE] py-[8px] rounded-[12px] text-[#fff] font-medium",
            { hidden: isLoading }
          )}
        >
          Sign In
        </button>
      </div>

      <div className="px-5">
        <button
          disabled
          type="submit"
          className={clsx(
            "w-full flex justify-center items-center gap-2  text-md bg-[#4361EE] py-[8px] rounded-[12px] text-[#fff] font-medium",
            { hidden: !isLoading }
          )}
        >
          <ClipLoader className="text-white" color="white" size={20} />
          <span>Sign In</span>
        </button>
      </div>
    </>
  );
};

export default SubmitButton;
