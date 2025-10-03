
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 pb-8 text-center text-gray-500 text-sm">
       <div className="bg-amber-500 text-slate-900 py-2 mb-8 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="font-semibold mx-4">
            Bản quyền thuộc về www.lecongnang.com, không sao chép với mọi hình thức.
          </span>
          <span className="font-semibold mx-4">
            Bản quyền thuộc về www.lecongnang.com, không sao chép với mọi hình thức.
          </span>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>
      <p>&copy; {new Date().getFullYear() + 1} www.lecongnang.com. All Rights Reserved.</p>
    </footer>
  );
};
