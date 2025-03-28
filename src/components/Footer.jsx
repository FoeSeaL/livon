import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Livon Cosmetics. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;