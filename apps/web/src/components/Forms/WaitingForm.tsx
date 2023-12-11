import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaitingFormProps } from "@/types/forms";
import { waitingFormSchema } from "@/config/formSchemas";

export const WaitingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitingFormProps>({
    resolver: zodResolver(waitingFormSchema),
    defaultValues: {
      Email: "",
    },
  });

  const submitHandler: SubmitHandler<WaitingFormProps> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(submitHandler)}>
        <input {...register("Email")} />
        <input type="submit" />
      </form>
    </div>
  );
};
