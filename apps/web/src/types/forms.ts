import { waitingFormSchema } from "@/config/formSchemas";
import { infer as zodInfer } from "zod";

export type WaitingFormProps = zodInfer<typeof waitingFormSchema>;
