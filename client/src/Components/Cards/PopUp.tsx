type ReviewProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
};
export default function Review({ open, onClose, children }: ReviewProps) {
  if (!open) return null; // hide component when closed

  return (
    <div
        onClick={onClose}
        className={`
            fixed inset-0 flex justify-center items-center transition-colors z-10
            ${open ? "visible bg-black/20" : "invisible"}
        `}
        >
        {/* modal */}
        <div
            onClick={(e) => e.stopPropagation()}
            className={`
            bg-white rounded-xl shadow p-6 transition-all w-[444px] max-w-full
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
        >
            {children}
        </div>
        </div>
  );
}