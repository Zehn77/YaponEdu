import { useState } from "react";
import loginImg from "./../../assets/loginImg.png";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/networkServices/authService";
import {
  PhoneNumberField,
  PasswordField,
  SubmitButton,
} from "../../components/login";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data, "salom");
      if (data.token) {
        toast.success("Siz tizimga muvaffaqqiyatli kirdingiz!");
        dispatch(signIn({ token: data.token }));
        navigate("/");
      } else if (data.message) {
        toast.error(data.message);
      } else {
        toast.error(
          "Tizimga kirishda xatolik sodir bo'ldi, iltimos boshqattan harakat qilib ko'ring!"
        );
      }
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      toast.error(
        "Tizimga kirishda xatolik sodir bo'ldi, iltimos boshqattan harakat qilib ko'ring!"
      );
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate({
      phoneNumber,
      password,
    });
  };

  return (
    <div className="flex items-center min-h-screen bg-white">
      <div className="flex-1 text-center flex items-center flex-col justify-center">
        <h3 className="text-[32px] font-medium">
          <span>Welcome to </span>
          <span className="text-[#3367F6] italic">Admin Dashboard</span>
        </h3>
        <p className="text-[20px] text-[#9EA3B5] font-medium">
          Please enter your admin credentials
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[380px] my-3 flex flex-col gap-4"
        >
          <PhoneNumberField
            setPhoneNumber={setPhoneNumber}
            isValidPhoneNumber={isValidPhoneNumber}
            setIsValidPhoneNumber={setIsValidPhoneNumber}
          />

          <PasswordField setPassword={setPassword} />

          <SubmitButton
            disabled={!(isValidPhoneNumber && password.length > 0)}
            isLoading={mutation.isPending}
          />
        </form>
      </div>
      <div className="flex-1 hidden md:block">
        <img src={loginImg} alt="Login Image" className="w-full" />
      </div>
    </div>
  );
};

export default LoginPage;
