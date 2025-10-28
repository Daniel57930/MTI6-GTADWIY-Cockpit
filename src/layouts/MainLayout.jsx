import TopSearchBar from "../components/TopSearchBar";

/**
 * MainLayout - Primary layout wrapper for the cockpit
 * Includes navigation, search, and main content area
 */
const MainLayout = ({ children, onSearch }) => {
  const handleSearch = (query) => {
    if (typeof onSearch === "function") {
      onSearch(query);
    } else {
      console.log("Search query:", query);
    }
  };

  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="main-layout__brand">
          <h1>GTADWIY Cockpit</h1>
        </div>
        <TopSearchBar onSearch={handleSearch} />
        <nav className="main-layout__nav">
          <a href="#dashboard" className="nav__link">Dashboard</a>
          <a href="#trading" className="nav__link">Trading</a>
          <a href="#brave" className="nav__link">Brave</a>
          <a href="#settings" className="nav__link">Settings</a>
        </nav>
      </header>
      
      <main className="main-layout__content">
        {children}
      </main>
      
      <footer className="main-layout__footer">
        <p>MTI6-GTADWIY-Cockpit © 2025 - Sovereign Control</p>
      </footer>
    </div>
  );
};

export default MainLayout;
