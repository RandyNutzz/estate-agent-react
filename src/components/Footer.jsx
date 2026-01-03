// Footer component with site information
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Site description */}
        <div className="footer-section">
          <h3 className="footer-title">Prime Estate</h3>
          <p className="footer-description">
            Your trusted partner in finding the perfect home. 
            We specialize in residential properties across London and surrounding areas.
          </p>
        </div>
        
        {/* Quick links */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Property Search</a></li>
            <li><a href="#favourites">My Favourites</a></li>
          </ul>
        </div>
        
        {/* Contact information */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Info</h4>
          <ul className="contact-info">
            <li>📍 123 Estate Street, London, UK</li>
            <li>📞 020 7946 0958</li>
            <li>📧 info@primeestate.com</li>
            <li>🕘 Mon-Fri: 9am-6pm</li>
          </ul>
        </div>
        
        {/* Coursework information */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Coursework</h4>
          <p className="coursework-info">
            This website is part of the <strong>5COSC026W Advanced Client-side Web Development</strong> coursework.
            University of Westminster - 2025/26
          </p>
        </div>
      </div>
      
      {/* Copyright and notes */}
      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} Prime Estate. All rights reserved. | 
          Coursework by Ranida Perera - UoW Student ID: w2149644
        </p>
        <p className="footer-note">
          This is a client-side React application for educational purposes.
        </p>
      </div>
    </footer>
  );
}

export default Footer;