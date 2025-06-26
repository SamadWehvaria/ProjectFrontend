// components/Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';

const Navbar = ({ onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(parsedUser.username || 'User');
      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    if (onSignOut) onSignOut();
    router.push('/auth');
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">
              HealthTranslate
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700">Welcome, {userName}</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button size="sm" variant="secondary" className="text-sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
