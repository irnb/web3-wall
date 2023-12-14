import { object, string } from "zod";

export const waitingFormSchema = object({
  email: string()
    .email()
    .min(2, "Minimum character is 2!")
    .max(100, "maximum character is 100!"),
});
