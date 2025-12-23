export default function ContactUs() {
  return (
    <div className="bg-[#f7f8fb] min-h-[calc(100vh-56px)] pt-8 pb-8  px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="w-full bg-white rounded-2xl p-7 md:p-8 lg:p-9 grid grid-cols-1 md:grid-cols-[minmax(320px,0.9fr)_minmax(360px,1.1fr)] gap-6 md:gap-7 items-start shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
        <div className="pr-2 md:pr-3">
          <p className="mb-2.5 md:mb-3 text-2xl md:text-[26px] font-extrabold text-[#1b2c4f]">
            Contact Us
          </p>
          <p className="mb-5 md:mb-6 text-[#6b7280] leading-relaxed max-w-[460px] text-base md:text-[17px]">
            We are committed to processing the information in order to contact you
            and talk about your questions.
          </p>

          <div className="flex flex-col gap-3 md:gap-3.5">
            <div className="flex gap-2.5 items-start text-[#1f2937] font-semibold text-base">
              <span className="text-xl leading-snug">📞</span>
              <span className="leading-normal">0800 707 535-321</span>
            </div>
            <div className="flex gap-2.5 items-start text-[#1f2937] font-semibold text-base">
              <span className="text-xl leading-snug">✉️</span>
              <span className="leading-normal">demo@example.com</span>
            </div>
            <div className="flex gap-2.5 items-start text-[#1f2937] font-semibold text-base">
              <span className="text-xl leading-snug">📍</span>
              <span className="leading-normal">
                526 Melrose Street, Water Mill, 11976
                <br />
                New York
              </span>
            </div>
          </div>
        </div>

        <form className="max-w-[540px] w-full flex flex-col gap-3.5 justify-self-end" onSubmit={(e) => e.preventDefault()}>
          <input
            className="w-full border border-[#d0d7e2] bg-[#f7f9fc] rounded-[10px] py-4 px-4 md:px-[18px] text-base md:text-[17px] outline-none transition-all focus:border-[#2d9cdb] focus:shadow-[0_0_0_3px_rgba(45,156,219,0.18)]"
            placeholder="Name"
          />
          <input
            className="w-full border border-[#d0d7e2] bg-[#f7f9fc] rounded-[10px] py-4 px-4 md:px-[18px] text-base md:text-[17px] outline-none transition-all focus:border-[#2d9cdb] focus:shadow-[0_0_0_3px_rgba(45,156,219,0.18)]"
            placeholder="Email"
            type="email"
          />
          <textarea
            className="w-full border border-[#d0d7e2] bg-[#f7f9fc] rounded-[10px] py-4 px-4 md:px-[18px] text-base md:text-[17px] outline-none transition-all focus:border-[#2d9cdb] focus:shadow-[0_0_0_3px_rgba(45,156,219,0.18)] resize-y min-h-[200px]"
            placeholder="Message"
            rows={5}
          />
          <button
            className="border-none rounded-md bg-[#1c73d2] text-white font-bold py-3.5 px-4 cursor-pointer transition-colors hover:bg-[#155fb0]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
