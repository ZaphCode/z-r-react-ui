import { FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  ph: string;
  name: string;
  registerData: UseFormRegisterReturn;
  type: HTMLInputTypeAttribute;
}

const InputField: FC<Props> = ({ type, ph, name, registerData }) => {
  return (
    <div className="bg-gray-200 items-center my-1 p-3 w-full flex">
      {/* <div className="pr-2 border-r-2 border-neutral-700">{icon}</div> */}
      <input
        {...registerData}
        name={name}
        type={type}
        placeholder={ph}
        className="bg-gray-200 w-full mx-4 py-1 outline-none"
      />
    </div>
  );
};

export default InputField;
