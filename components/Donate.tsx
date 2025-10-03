
import React, { useState } from 'react';
import { Section } from './Section';

export const Donate: React.FC = () => {
  const accountNumber = '1277777277777';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Section title="Kiến tạo văn hoá cảm ơn">
      <div className="max-w-3xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-400">☕ Mời cafe chuyên gia</h3>
            <p className="text-gray-300">"Mỗi lần sử dụng App, hãy mời chuyên gia một ly cafe để tiếp tục kiến tạo công cụ hỗ trợ cộng đồng.”</p>
            <div className="space-y-2 pt-2">
              <p><span className="font-semibold text-gray-400">Ngân hàng:</span> MB Bank</p>
              <p><span className="font-semibold text-gray-400">Chủ tài khoản:</span> Lê Công Năng</p>
              <div className="flex items-center gap-4">
                <p><span className="font-semibold text-gray-400">Số tài khoản:</span> {accountNumber}</p>
                <button onClick={handleCopy} className="bg-slate-700 text-sm px-3 py-1 rounded-md hover:bg-slate-600">
                  {copied ? 'Đã chép' : 'Sao chép'}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img 
              src="https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/556293678_782111981264982_5052042651500905354_n.jpg?stp=dst-jpg_p228x119_tt6&_nc_cat=104&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeG6LucrBGY9w85xSnGRi6SVETmyJMU4e08RObIkxTh7T31DXXCXhpP855Dt1o6z0uavylI11KMy_PMxj14SuQiW&_nc_ohc=JdVC3v1dULIQ7kNvwEebVjg&_nc_oc=AdmV4DS9caGp0I3mGRjm0sv8k2Vgb-4ha-WsqrnTzD23dBMT05E0bVb_c6gAXrvY0Uu8eBqVstb5c3sa9jCo0RMk&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fhan3-5.fna&_nc_gid=Czr84onF5QZE3AtEalbCjw&oh=00_Afb1eYmdYkehZQB-GRfreoFfnfK7JayuDj_JvlsPACcWPA&oe=68E138AA" 
              alt="QR Code" 
              className="w-48 h-48 rounded-lg border-2 border-slate-600"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
