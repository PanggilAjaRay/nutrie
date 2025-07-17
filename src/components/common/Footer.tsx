import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nutrié by Gizi UAD</h3>
            <p>Chintiya</p>
            <p>Tiara Amanda Putri</p>
            <p>Firman</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/foods" className="text-gray-300 hover:text-green-400 transition-colors">
                  Foods
                </Link>
              </li>
              <li>
                <Link to="/beverages" className="text-gray-300 hover:text-green-400 transition-colors">
                  Beverages
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>Program Studi S1 Gizi, Jl. Prof.DR.Soepomo Sh, Warungboto, Umbulharjo</p>
              <p> Yogyakarta, Daerah Istimewa Yogyakarta</p>
              <p className="mt-2">Email: prodi@gizi.uad.ac.id</p>
              <p>Telepon: +62 882 1573 2893</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Nutrié by Gizi UAD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;