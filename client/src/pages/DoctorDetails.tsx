import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Share2,
  MapPin,
  Star,
  Users,
  Clock3,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useDoctor } from "../hooks/useDoctor";

export default function DoctorDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: doctor, isLoading, error } = useDoctor(id);

  if (isLoading) {
    return (
      <section className="bg-[#f7f8fb] py-10 px-5 font-['Montserrat',sans-serif]">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center py-20">
            <p className="text-[#6b7280]">Loading doctor details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !doctor) {
    return (
      <section className="bg-[#f7f8fb] py-10 px-5 font-['Montserrat',sans-serif]">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center py-20">
            <p className="text-red-600">Failed to load doctor details</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-[#1c73d2] font-bold"
            >
              Go back
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Get first review for display
  const firstReview = doctor.reviews ? Object.values(doctor.reviews)[0] : null;

  return (
    <section className="bg-[#f7f8fb] py-10 px-5]">
      <div className="max-w-[1180px] mx-auto">
        <header className="flex items-center justify-between mb-4.5">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full border border-[#e5e7eb] bg-white inline-flex items-center justify-center cursor-pointer hover:bg-[#f3f4f6]"
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-bold text-[#1b2c4f]">Doctor Details</span>
          <button
            className="w-9 h-9 rounded-full border border-[#e5e7eb] bg-white inline-flex items-center justify-center cursor-pointer hover:bg-[#f3f4f6]"
            aria-label="Share"
          >
            <Share2 size={16} />
          </button>
        </header>

        <div className="flex gap-4 items-center bg-white p-4.5 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
          <div className="relative">
            <img
              src={doctor.profile_image}
              alt={doctor.name}
              className="w-[84px] h-[84px] rounded-full object-cover border-[3px] border-[#f3f4f6]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 text-xl font-extrabold text-[#1b2c4f]">{doctor.name}</h2>
            <p className="m-0 text-[#6b7280] font-semibold text-sm">{doctor.specialty.name}</p>
            <div className="flex gap-1.5 items-center text-[#374151] text-sm">
              <MapPin size={16} />
              <span>{doctor.hospital_name}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 mb-5.5">
          <div className="flex gap-2.5 items-center bg-white rounded-xl p-3 px-3.5 shadow-[0_6px_16px_rgba(0,0,0,0.04)]">
            <Users size={18} />
            <div>
              <p className="m-0 text-xs text-[#6b7280] lowercase">patients</p>
              <p className="m-0 font-bold text-[#1f2937]">{doctor.total_patients}+</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-center bg-white rounded-xl p-3 px-3.5 shadow-[0_6px_16px_rgba(0,0,0,0.04)]">
            <Clock3 size={18} />
            <div>
              <p className="m-0 text-xs text-[#6b7280] lowercase">experience</p>
              <p className="m-0 font-bold text-[#1f2937]">{doctor.years_of_experience}+</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-center bg-white rounded-xl p-3 px-3.5 shadow-[0_6px_16px_rgba(0,0,0,0.04)]">
            <Star size={18} />
            <div>
              <p className="m-0 text-xs text-[#6b7280] lowercase">rating</p>
              <p className="m-0 font-bold text-[#1f2937]">{doctor.rating}</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-center bg-white rounded-xl p-3 px-3.5 shadow-[0_6px_16px_rgba(0,0,0,0.04)]">
            <MessageSquare size={18} />
            <div>
              <p className="m-0 text-xs text-[#6b7280] lowercase">reviews</p>
              <p className="m-0 font-bold text-[#1f2937]">{doctor.total_reviews}+</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
          <div className="flex flex-col gap-4">
            <section className="bg-white rounded-2xl p-4 shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
              <h3 className="m-0 mb-2.5 text-[#1b2c4f]">About me</h3>
              <p className="m-0 leading-relaxed text-[#4b5563]">
                {doctor.bio}
              </p>
            </section>

            <section className="bg-white rounded-2xl p-4 shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="m-0 mb-2.5 text-[#1b2c4f]">Reviews and Rating</h3>
                <button className="border-none bg-transparent text-[#1c73d2] cursor-pointer font-bold">
                  View all
                </button>
              </div>
              <div className="flex gap-3 items-baseline mb-3">
                <span className="text-[22px] font-extrabold text-[#111827]">{doctor.rating}/5</span>
                <span className="text-[#6b7280] font-semibold">{doctor.total_reviews}+ Reviews</span>
              </div>
              {firstReview ? (
                <div className="border border-[#e5e7eb] rounded-xl p-3.5 bg-[#f9fafb]">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-10 h-10 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#6b7280] font-bold">
                        {firstReview.patient_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="m-0 font-bold">{firstReview.patient_name}</p>
                        <p className="m-0 text-[#6b7280] text-xs">{firstReview.time_ago}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-[#fff7ed] text-[#ea580c] py-1.5 px-2.5 rounded-[10px] font-bold">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" /> {firstReview.rating}
                    </span>
                  </div>
                  <p className="m-0 text-[#374151] leading-relaxed">
                    {firstReview.comment}
                  </p>
                </div>
              ) : (
                <p className="text-[#6b7280] text-sm">No reviews yet</p>
              )}
            </section>
          </div>

          <aside className="flex flex-col gap-3.5">
            <div className="bg-white rounded-[14px] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.06)] flex flex-col gap-2.5">
              <h4 className="m-0 text-[#1b2c4f]">Contact</h4>
              <div className="flex gap-2 items-center text-[#374151]">
                <Phone size={16} />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex gap-2 items-center text-[#374151]">
                <MapPin size={16} />
                <span>{doctor.hospital_name}</span>
              </div>
              <div className="flex gap-2 items-center text-[#374151]">
                <MessageSquare size={16} />
                <span>{doctor.email}</span>
              </div>
            </div>

            <div className="bg-white rounded-[14px] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.06)] flex flex-col gap-3.5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="m-0 text-[#6b7280]">Price / hour</p>
                  <p className="mt-1 mb-0 text-xl font-extrabold text-[#111827]">${doctor.consultation_fee}</p>
                </div>
                <span className="bg-[#e0f2fe] text-[#0369a1] py-1.5 px-2.5 rounded-full font-bold">
                  In-person
                </span>
              </div>
              <Link
                className="w-full border-none rounded-[10px] bg-[#1c73d2] text-white font-bold py-3 px-3.5 cursor-pointer transition-colors hover:bg-[#155fb0] text-center no-underline inline-block"
                to={`/payment?booking_id=${doctor.id}`}
              >
                Book Appointment
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

