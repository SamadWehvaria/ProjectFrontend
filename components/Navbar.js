import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';

const Navbar = ({ userName, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/auth');
  };

  // Don't render anything until client-side
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
            <span className="text-gray-700">
              Welcome, {userName}
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={onSignOut}
              className="text-sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 