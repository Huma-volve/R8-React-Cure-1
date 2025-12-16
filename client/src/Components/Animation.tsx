import { motion, AnimatePresence } from "framer-motion";

type Props = {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
};

export default function AnimatedPagination({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: Props) {
  const isFirstPage = currentPage === 1;

  return (
    <div className="flex justify-around gap-3 mt-6">

      <AnimatePresence initial={false}>

        {/* Previous Button */}
        {!isFirstPage && (
          <motion.button
            key="prev"
            initial={{ opacity: 0, x: -0, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={onPrev}
            className="px-4 py-2 w-[247px] border rounded-xl border-blue-700 text-blue-700 bg-transparent hover:bg-blue-700 hover:text-white transition"
          >
            Previous
          </motion.button>
        )}

        {/* Next Button */}
            <motion.button
            key="next"
            initial={isFirstPage ? { width: "280px", height:"52px"} : { opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1, width: "280px",height:"52px" }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={onNext}
            className="border rounded-xl border-blue-700 text-blue-700 bg-transparent hover:bg-blue-700 hover:text-white transition"
            >
            Next
            </motion.button>

      </AnimatePresence>

    </div>
  );
}
