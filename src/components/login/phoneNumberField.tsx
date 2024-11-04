import { FaPhoneFlip } from "react-icons/fa6";
import { InputMask } from "@react-input/mask";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface PhoneNumberFieldProps {
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setIsValidPhoneNumber: Dispatch<SetStateAction<boolean>>;
  isValidPhoneNumber: boolean;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  isValidPhoneNumber,
  setIsValidPhoneNumber,
  setPhoneNumber,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center border px-3 py-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5",
        { "border-red-500": !isValidPhoneNumber }
      )}
    >
      <InputMask
        mask="+998 (__) ___-__-__"
        replacement={{ _: /\d/ }}
        placeholder="+998"
        onMask={(e) => {
          const { isValid, input } = e.detail;
          setIsValidPhoneNumber(isValid);
          setPhoneNumber(input);
        }}
        required
        className="flex-1 outline-none bg-gray-50"
      />
      <FaPhoneFlip className="text-gray-500" />
    </div>
  );
};

export default PhoneNumberField;
