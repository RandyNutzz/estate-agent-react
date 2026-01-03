import { Link, useLocation } from 'react-router-dom';

// Main header component with navigation
function Header() {
  const location = useLocation();
  const isSearchPage = location.pathname === '/';

  // Handle clicking the favourites button
  const handleFavouritesClick = () => {
    if (isSearchPage) {
      // On search page: scroll to favourites section
      setTimeout(() => {
        const favouritesSection = document.querySelector('.favourites-section');
        if (favouritesSection) {
          favouritesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      // On property page: go back to search page with hash
      window.location.href = '/#favourites';
    }
  };

  return (
    <header className="site-header">
      {/* Logo and site title */}
      <Link to="/" className="logo-link">
        🏠 <span className="site-title">Prime Estate</span>
      </Link>
      
      {/* Main navigation */}
      <nav className="main-nav">
        {/* Link to search page */}
        <Link to="/" className="nav-link">
          🔍 Search
        </Link>
        
        {/* Button to view favourites */}
        <button 
          onClick={handleFavouritesClick}
          className="favourites-nav-button"
        >
          ⭐ Favourites
        </button>
      </nav>
    </header>
  );
}

export default Header;