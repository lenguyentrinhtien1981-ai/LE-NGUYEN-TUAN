
import React, { useState, useEffect } from 'react';

interface SecurityModalProps {
  onComplete: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    let timer: ReturnType<typeof setInterval>;
    if (step === 1.5) { // Waiting after step 1
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep(2);
            setCountdown(5);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (step === 2.5) { // Waiting after step 2
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep(3);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  const handleFollowClick = () => {
    window.open('https://www.facebook.com/lecongnang86', '_blank');
    setStep(1.5);
  };
  
  const handleCommentClick = () => {
    window.open('https://web.facebook.com/photo/?fbid=611902304952618&set=a.104021742407346', '_blank');
    setStep(2.5);
  };

  useEffect(() => {
    if (step === 3) {
      onComplete();
    }
  }, [step, onComplete]);

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Yêu cầu bảo mật</h3>
            <p className="mb-6 text-gray-300">Theo dõi chuyên gia Lê Công Năng trên Facebook để mở quyền sử dụng APP.</p>
            <button onClick={handleFollowClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              FOLLOW
            </button>
          </>
        );
      case 1.5:
         return (
          <>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Vui lòng chờ</h3>
            <p className="mb-6 text-gray-300">Chuyển sang bước tiếp theo trong {countdown} giây...</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(5 - countdown) / 5 * 100}%` }}></div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Bước cuối cùng</h3>
            <p className="mb-6 text-gray-300">Xác nhận đã theo dõi bằng cách bình luận "Rất vui được kết nối với chuyên gia" trong Ảnh đại diện Facebook của Lê Công Năng.</p>
            <button onClick={handleCommentClick} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              BÌNH LUẬN NGAY
            </button>
          </>
        );
      case 2.5:
        return (
          <>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Đang mở khóa APP</h3>
            <p className="mb-6 text-gray-300">Vui lòng chờ {countdown} giây để hệ thống xác nhận và mở APP...</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(5 - countdown) / 5 * 100}%` }}></div>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {renderStepContent()}
      </div>
    </div>
  );
};
