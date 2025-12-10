export default function ContactUs() {
  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <p className="contact-title">Contact Us</p>
          <p className="contact-desc">
            We are committed to processing the information in order to contact you
            and talk about your questions.
          </p>

          <div className="contact-items">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span className="contact-text">0800 707 535-321</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span className="contact-text">demo@example.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span className="contact-text">
                526 Melrose Street, Water Mill, 11976
                <br />
                New York
              </span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input className="contact-input" placeholder="Name" />
          <input className="contact-input" placeholder="Email" type="email" />
          <textarea className="contact-input contact-textarea" placeholder="Message" rows={5} />
          <button className="contact-submit" type="submit">
            Submit
          </button>
        </form>
      </div>

    </div>
  );
}
