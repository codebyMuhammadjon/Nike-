import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  // SVG Ikonkalar (Lucide o'rniga oddiy kodlar)
  const icons = {
    twitter: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-1 2-2 2.5S17.5 5 15 5c-3 0-5 2.5-5 5.5 0 .5 0 1 .5 1.5-4-.2-7-2-9-5 0 0-1 2 1 4-.5 0-1 0-1.5-.5 0 1.5 1 3 3 3.5-.5.2-1 .2-1.5 0 .5 1.5 2 2.5 3.5 2.5-1.5 1-3.5 1.5-5.5 1.5 0 0 4 3 10 3 9 0 14-7 14-14 0-.2 0-.4 0-.6 1-.7 1.5-1.5 2-2.5z" />
      </svg>
    ),
    instagram: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    facebook: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    youtube: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Find a Store */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white">
              Find a Store
            </h4>
            <ul className="text-[12px] text-gray-400 space-y-3 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Become a Member
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Send Us Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Get Help */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white">
              Get Help
            </h4>
            <ul className="text-[12px] text-gray-400 space-y-3 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Payment Options
                </a>
              </li>
            </ul>
          </div>

          {/* About Nike */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white">
              About Nike
            </h4>
            <ul className="text-[12px] text-gray-400 space-y-3 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Investors
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <div className="flex gap-4 md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white">
                {icons.twitter}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                {icons.instagram}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                {icons.facebook}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                {icons.youtube}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-medium">
          <div className="flex gap-6 mb-4 md:mb-0 uppercase">
            <a href="#" className="hover:text-white">
              Terms of Sale
            </a>
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Nike, Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
