import { Link } from "react-router-dom";
import { doctors } from "../data/doctors";
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

export default function DoctorDetails() {
  const doctor = doctors[0];

  return (
    <section className="doctor-details">
      <div className="doctor-details-inner">
        <header className="doctor-topbar">
          <button className="icon-btn" aria-label="Back">
            <ChevronLeft size={18} />
          </button>
          <span className="doctor-top-title">Doctor Details</span>
          <button className="icon-btn" aria-label="Share">
            <Share2 size={16} />
          </button>
        </header>

        <div className="doctor-card-hero">
          <div className="doctor-avatar-wrap">
            <img src={doctor.image} alt={doctor.name} className="doctor-avatar-lg" />
          </div>
          <div className="doctor-meta">
            <h2 className="doctor-name-lg">{doctor.name}</h2>
            <p className="doctor-specialty-lg">Pulmonologist</p>
            <div className="doctor-location">
              <MapPin size={16} />
              <span>129, El-Nasr Street, Cairo</span>
            </div>
          </div>
        </div>

        <div className="doctor-stats-grid">
          <div className="stat-pill">
            <Users size={18} />
            <div>
              <p className="stat-label">patients</p>
              <p className="stat-value">2,000+</p>
            </div>
          </div>
          <div className="stat-pill">
            <Clock3 size={18} />
            <div>
              <p className="stat-label">experience</p>
              <p className="stat-value">10+</p>
            </div>
          </div>
          <div className="stat-pill">
            <Star size={18} />
            <div>
              <p className="stat-label">rating</p>
              <p className="stat-value">4.5</p>
            </div>
          </div>
          <div className="stat-pill">
            <MessageSquare size={18} />
            <div>
              <p className="stat-label">reviews</p>
              <p className="stat-value">1,875+</p>
            </div>
          </div>
        </div>

        <div className="doctor-details-grid">
          <div className="doctor-main-col">
            <section className="doctor-section">
              <h3>About me</h3>
              <p className="about-text">
                Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience
                in diagnosing and treating a wide range of respiratory and pulmonary conditions.
                She is passionate about preventive care and comprehensive treatment plans that put
                patients first.
                <button className="text-link">Read more</button>
              </p>
            </section>

            <section className="doctor-section">
              <div className="section-header">
                <h3>Reviews and Rating</h3>
                <button className="text-link">View all</button>
              </div>
              <div className="rating-row">
                <span className="rating-score">4.5/5</span>
                <span className="rating-count">1250+ Reviews</span>
              </div>
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer">
                    <img
                      src="https://i.pravatar.cc/60?img=45"
                      alt="Nabila Reyna"
                      className="reviewer-avatar"
                    />
                    <div>
                      <p className="reviewer-name">Nabila Reyna</p>
                      <p className="reviewer-time">30 min ago</p>
                    </div>
                  </div>
                  <span className="review-badge">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" /> 4.5
                  </span>
                </div>
                <p className="review-text">
                  Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was
                  clean, and the staff were friendly. Highly recommend for in-person care!
                </p>
              </div>
            </section>
          </div>

          <aside className="doctor-side-col">
            <div className="info-card">
              <h4>Contact</h4>
              <div className="info-line">
                <Phone size={16} />
                <span>(0800) 707 535-321</span>
              </div>
              <div className="info-line">
                <MapPin size={16} />
                <span>129, El-Nasr Street, Cairo</span>
              </div>
              <div className="info-line">
                <MessageSquare size={16} />
                <span>demo@example.com</span>
              </div>
            </div>

            <div className="info-card price-card">
              <div className="price-top">
                <div>
                  <p className="price-label">Price / hour</p>
                  <p className="price-value">$350</p>
                </div>
                <span className="price-badge">In-person</span>
              </div>
              <Link className="cta-btn" to="/payment">
                Book Appointment
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

