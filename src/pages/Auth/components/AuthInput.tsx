import { FC, HTMLInputTypeAttribute, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps {
  icon: ReactNode;
  ph: string;
  af?: boolean;
  value?: string;
  name: string;
  registerData: UseFormRegisterReturn;
  type: HTMLInputTypeAttribute;
}

const AuthInput: FC<AuthInputProps> = ({
  icon,
  type,
  ph,
  af,
  name,
  registerData,
  value,
}) => {
  return (
    <div className="bg-gray-200 items-center my-1 p-3 w-3/4 flex">
      <div className="pr-2 border-r-2 border-neutral-700">{icon}</div>
      <input
        {...registerData}
        name={name}
        type={type}
        value={value && value}
        autoFocus={af}
        placeholder={ph}
        className="bg-gray-200 w-full mx-4 py-1 outline-none"
      />
    </div>
  );
};

export default AuthInput;
