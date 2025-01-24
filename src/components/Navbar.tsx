import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinkClasses = (path: string) => `
    relative text-white transition-colors
    ${isActive(path) 
      ? 'text-cyan-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400' 
      : 'hover:text-cyan-400'
    }
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur border-b border-cyan-500/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Inga Palatova
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/portfolio" className={navLinkClasses('/portfolio')}>
            Projekte
            </Link>
            <Link to="/about" className={navLinkClasses('/about')}>
              Über mich
            </Link>
            <Link to="/contact" className={navLinkClasses('/contact')}>
              Kontakt
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`text-red-400 hover:text-red-300 transition-colors ${
                      isActive('/admin') ? 'font-semibold' : ''
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30 hover:border-red-500/50 hover:from-red-500/30 hover:to-red-600/30 text-red-400 hover:text-red-300 transition-all"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Abmelden
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-400 hover:text-cyan-300 transition-all ${
                  isActive('/login') ? 'from-cyan-500/30 to-purple-500/30 border-cyan-500/50' : ''
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Admin-Login
              </Link>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link 
              to="/portfolio" 
              className={`block py-2 ${navLinkClasses('/portfolio')}`}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 ${navLinkClasses('/about')}`}
            >
              Über mich
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 ${navLinkClasses('/contact')}`}
            >
              Kontakt
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`block py-2 text-red-400 hover:text-red-300 transition-colors ${
                      isActive('/admin') ? 'font-semibold' : ''
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`block py-2 text-cyan-400 hover:text-cyan-300 transition-colors ${
                  isActive('/login') ? 'font-semibold' : ''
                }`}
              >
                Anmelden
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;