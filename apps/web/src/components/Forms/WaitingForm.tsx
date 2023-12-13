"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaitingFormProps } from "@/types/forms";
import { waitingFormSchema } from "@/config/formSchemas";
import { joinWaitingList } from "@/serverActions/waitingFormAction";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import PuffLoader from "react-spinners/PuffLoader";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const isFormLoading = isApiLoading || isSubmitting || isLoading;

  const submitHandler: SubmitHandler<WaitingFormProps> = async (data) => {
    try {
      setApiError(null);
      setIsApiLoading(true);
      await joinWaitingList(data.email);
      setIsSuccess(true);
      setIsApiLoading(false);
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
          className="flex justify-center items-center gap-2"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            {...register("email")}
            color="primary"
            placeholder="name@example.com"
            className="text-white"
          />
          <Button className="w-[256px] p-3" type="submit" variant="default">
            {isFormLoading ? (
              <div className="w-full h-full flex gap-1 justify-center items-center">
                <PuffLoader
                  color={"black"}
                  loading={true}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <span>Submiting!</span>
              </div>
            ) : (
              "Join Our Waitlist!"
            )}
          </Button>
        </form>
      )}

      {isSuccess && (
        <Alert variant={"success"} color="black" className="bg-green-300">
          <CheckCircle className="h-5 w-5" />
          <AlertDescription className="text-base font-bold">
            You successfully joined to the waiting list!
          </AlertDescription>
        </Alert>
      )}
      {!!errors.email && (
        <Alert
          variant={"destructive"}
          color="black"
          className="bg-red-300 mt-2 "
        >
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="text-base font-bold">
            {errors.email?.message}
          </AlertDescription>
        </Alert>
      )}
      {!!apiError && (
        <Alert
          variant={"destructive"}
          color="black"
          className="bg-red-300 mt-2 "
        >
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="text-sm font-bold">
            {apiError}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
