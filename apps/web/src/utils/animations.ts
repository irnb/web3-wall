import { Variants } from "framer-motion";

export const defaultFramerProps = { initial: "hidden", animate: "visible" };

export const fadeInAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: {
      delay: custom,
      duration: 1,
    },
  }),
};
