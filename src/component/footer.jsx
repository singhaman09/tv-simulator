import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900/80 text-white shadow-inner text-center py-4 text-lg font-medium">
      <p className="transition-all duration-300 hover:text-orange-600 hover:scale-105 transform">
        © 2025 Country & User App. All rights reserved.
      </p>
    </footer>
  );
}

export default React.memo(Footer);
