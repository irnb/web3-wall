"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaitingFormProps } from "@/types/forms";
import { waitingFormSchema } from "@/config/formSchemas";
import { joinWaitingList } from "@/serverActions/waitingFormAction";
import { useState } from "react";
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";

export const WaitingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<WaitingFormProps>({
    resolver: zodResolver(waitingFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitHandler: SubmitHandler<WaitingFormProps> = async (data) => {
    try {
      setIsApiLoading(true);
      await joinWaitingList(data.email);
      setIsSuccess(true);
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
      {!isSuccess && (
        <form
          className="flex justify-center items-center gap-1.5"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            {...register("email")}
            focusBorderColor="rgb(58, 35, 108)"
            placeholder="name@example.com"
          />
          <Button
            className=""
            w={256}
            px={10}
            type="submit"
            variant={"solid"}
            colorScheme="purple"
            isLoading={isLoading || isApiLoading || isSubmitting}
            loadingText="Submitting"
          >
            Join Our Waitlist!
          </Button>
        </form>
      )}
      {isSuccess && (
        <Alert status="success" className="rounded-lg">
          <AlertIcon />
          You successfully joined to the waiting list!
        </Alert>
      )}
    </div>
  );
};
