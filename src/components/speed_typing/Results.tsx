import { motion } from "framer-motion";
import { format } from "path";
import { formatPercentage } from "../../utils/helpers";
import { State } from "../../hooks/speed_typing/useEngine";

type Props = {
  errors: number;
  accurancyPercentage: number;
  total: number;
  className?: string;
  state: State;
};
export const Results = ({
  errors,
  accurancyPercentage,
  total,
  className,
  state,
}: Props) => {
  const init = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== "finish") {
    return null;
  }

  return (
    <motion.ul
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={init}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={init}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accurancy: {formatPercentage(accurancyPercentage)}
      </motion.li>
      <motion.li
        initial={init}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={init}
        animate={animate}
        transition={{ ...duration, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};
