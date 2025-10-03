
import React, { useState, useEffect } from 'react';

const names = ["Nguyễn Văn An", "Trần Thị Bích", "Lê Hoàng Cường", "Phạm Thu Duyên", "Võ Minh Kha"];
const actions = [
    "vừa tạo ảnh concept Doanh nhân làm việc",
    "vừa sử dụng Trợ lý AI",
    "vừa đặt khoá học Làm chủ AI",
    "vừa tạo ảnh concept Doanh nhân chơi thể thao",
    "vừa kết nối với chuyên gia"
];

export const SocialProof: React.FC = () => {
    const [notification, setNotification] = useState<{ name: string; action: string } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showNotification = () => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            setNotification({ name: randomName, action: randomAction });
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false);
            }, 5000); // Notification visible for 5 seconds
        };
        
        // Show first notification after a short delay
        const initialTimeout = setTimeout(showNotification, 3000);

        // Then show notifications every 8-12 seconds
        const interval = setInterval(showNotification, Math.floor(Math.random() * 5000) + 8000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    if (!notification) return null;

    return (
        <div className={`fixed bottom-5 left-5 bg-slate-800 border border-amber-400/50 text-white py-3 px-5 rounded-xl shadow-lg z-50 transition-transform duration-500 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
            <p className="text-sm">
                <span className="font-bold">{notification.name}</span> {notification.action}...
            </p>
        </div>
    );
};
