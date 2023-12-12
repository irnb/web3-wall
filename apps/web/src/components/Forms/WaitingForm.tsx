"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaitingFormProps } from "@/types/forms";
import { waitingFormSchema } from "@/config/formSchemas";
import { joinWaitingList } from "@/serverActions/waitingFormAction";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

export const WaitingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<WaitingFormProps>({
    resolver: zodResolver(waitingFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const submitHandler: SubmitHandler<WaitingFormProps> = async (data) => {
    try {
      setIsApiLoading(true);
      await joinWaitingList(data.email);
      setIsApiLoading(false);
      setApiError(null);
      reset();
    } catch (error) {
      setIsApiLoading(false);
      setApiError(
        "An error occurred while submitting the form. Please try again."
      );
      console.error(error);
    }
  };

  return (
    <div>
      <form
        className="flex justify-center items-center gap-1.5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input {...register("email")} />
        <Button className="" px={5} type="submit" variant={"solid"}>
          Join!
        </Button>
      </form>
    </div>
  );
};
