import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import {
  NewAddressSchemaType,
  newAddressSchema,
} from "../../../../utils/schemas";
import { createAddressAPICall } from "../../../../api/addresses";
import InputField from "../../../../components/InputField";

interface Props {
  closeModalFn: () => void;
}

const NewAddressForm: FC<Props> = ({ closeModalFn }) => {
  const { register, handleSubmit } = useForm<NewAddressSchemaType>({
    resolver: zodResolver(newAddressSchema),
  });

  const onSubmit: SubmitHandler<NewAddressSchemaType> = async (data) => {
    alert(`Address ${data.name} created!`);

    const [resData, err] = await createAddressAPICall(data);

    console.log(err);

    if (err) return toast.error(err.message);

    console.log(resData);

    closeModalFn();
  };

  const onError: SubmitErrorHandler<NewAddressSchemaType> = (data) => {
    if (data.name?.message) return toast.error(data.name.message);
    if (data.line1?.message) return toast.error(data.line1.message);
    if (data.line2?.message) return toast.error(data.line2.message);
    if (data.city?.message) return toast.error(data.city.message);
    if (data.country?.message) return toast.error(data.country.message);
    if (data.postal_code?.message) return toast.error(data.postal_code.message);
    if (data.state?.message) return toast.error(data.state.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="w-[500px]">
      <h4 className="text-center mb-2 text-lg tracking-widest pfont font-semibold  text-neutral-800">
        New Address
      </h4>
      <div className="flex flex-col gap-y-2">
        <InputField
          name="addressName"
          ph="address name"
          type="text"
          registerData={register("name")}
        />
        <div className="border-neutral-200 my-2 solid border-b-2"></div>
        <InputField
          name="line1"
          ph="line 1"
          type="text"
          registerData={register("line1")}
        />
        <InputField
          name="line2"
          ph="line 2"
          type="text"
          registerData={register("line2")}
        />
        <InputField
          name="country"
          ph="country"
          type="text"
          registerData={register("country")}
        />
        <InputField
          name="state"
          ph="province / state"
          type="text"
          registerData={register("state")}
        />
        <InputField
          name="city"
          ph="city"
          type="text"
          registerData={register("city")}
        />
        <InputField
          name="postalCode"
          ph="postal code"
          type="text"
          registerData={register("postal_code")}
        />
      </div>
      <button className="mx-auto mt-3 w-full  pfont font-bold py-3 text-white bg-neutral-700 hover:bg-neutral-800 transition-all ease-in">
        Send
      </button>
    </form>
  );
};

export default NewAddressForm;
