import { motion, AnimatePresence } from "framer-motion";

type Props = {
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
  totalpages: number;
};

export default function AnimatedPagination({
  currentPage,
  onNext,
  onPrev,
  totalpages,
}: Props) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalpages
  const justifyClass =
    isFirstPage || isLastPage ? "justify-center" : "justify-around";
  return (

    
    <div className={`flex mt-6 ${justifyClass}`}>
      {/* PREVIOUS SLOT */}
      <div className="w-20 md:40 lg:w-70 h-13">
        <AnimatePresence>
          {!isFirstPage && (
            <motion.button
              key="prev"
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={onPrev}
              className="w-full h-full  border rounded-xl border-blue-700 text-blue-700 bg-transparent hover:bg-blue-700 hover:text-white transition"
            >
              Previous
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* NEXT SLOT */}
      <div className="w-20 md:40 lg:w-70 h-13">
        <AnimatePresence>
          {!isLastPage && (
            <motion.button
              key="next"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={onNext}
              className="w-full h-full border rounded-xl border-blue-700 text-blue-700 bg-transparent hover:bg-blue-700 hover:text-white transition"
            >
              Next
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
