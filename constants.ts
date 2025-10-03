// FIX: Importing AspectRatio type from the refactored types.ts file.
import type { AspectRatio } from './types';

export const HEADER_LINKS = [
  { name: 'Tạo ảnh', href: '#generator' },
  { name: 'Trợ lý AI', href: '#assistants' },
  { name: 'Làm chủ AI', href: '#training' },
  { name: 'Cộng đồng AI FOR BUSINESS', href: '#community' },
];

export const AGES = ['Nhi đồng', 'Thiếu niên', 'Thanh niên', 'Trung niên', 'Cao niên'];

export const CONCEPTS = [
  'Doanh nhân làm việc',
  'Doanh nhân chơi thể thao',
  'Doanh nhân dùng tiệc',
  'Doanh nhân học tập',
  'Doanh nhân truyền cảm hứng',
  'Doanh nhân du lịch thế giới',
  'Doanh nhân & cô thư ký',
  'Doanh nhân chơi xe',
];

export const ASPECT_RATIOS: AspectRatio[] = ['1:1', '4:5', '3:4', '9:16', '16:9'];

// FIX: Added constants that were previously in types.ts
export const QUICK_OUTFITS = ['Vest', 'Casual', 'Thể thao', 'Sơ mi trắng'];
export const QUICK_SETTINGS = ['Văn phòng', 'Sân golf', 'Tiệc', 'Showroom xe'];
export const QUICK_PROPS = ['Laptop', 'Xe hơi', 'Micro', 'Sách'];
export const QUICK_EXPRESSIONS = ['Tự tin', 'Mỉm cười', 'Hành động', 'Nghiêm túc'];

export const SHOOTING_TECHNIQUES = [
  {
    label: "Ánh sáng (Lighting)",
    options: [
      "Rembrandt: Tạo tam giác sáng dưới mắt → sâu lắng, kịch tính.",
      "Butterfly: Ánh sáng chính diện từ trên → tôn đường nét khuôn mặt.",
      "Split: Nửa sáng – nửa tối → bí ẩn, mạnh mẽ.",
      "Backlight / Rim Light: Tạo viền sáng quanh tóc → nổi bật nhân vật.",
    ]
  },
  {
    label: "Bố cục (Composition)",
    options: [
      "Rule of Thirds: Mắt đặt trên đường 1/3 → cân đối.",
      "Framing: Dùng cửa sổ, cây cối bao quanh → tập trung nhân vật.",
      "Negative Space: Để nhiều khoảng trống → gợi cảm xúc cô đơn hoặc tự do.",
    ]
  },
  {
    label: "Góc chụp (Angles)",
    options: [
      "Eye-level: Gần gũi, tự nhiên.",
      "High Angle: Nhân vật nhỏ bé, yếu đuối.",
      "Low Angle: Quyền lực, uy nghi.",
      "Dutch Angle: Góc nghiêng → bất ổn, nghệ thuật.",
    ]
  },
  {
    label: "Hậu cảnh (Background)",
    options: [
      "Bokeh: Xóa phông, nổi bật chủ thể.",
      "Environmental Portrait: Giữ cảnh nền để kể chuyện.",
      "Studio Backdrop: Nền đơn giản → tập trung khuôn mặt.",
    ]
  },
  {
    label: "Kỹ thuật sáng tạo (Creative Techniques)",
    options: [
      "Black & White: Nhấn mạnh cảm xúc.",
      "Double Exposure: Chồng nhiều lớp hình ảnh.",
      "Motion Blur: Hiệu ứng chuyển động trong ảnh tĩnh.",
      "Lens Flare: Ánh sáng lóe tạo chất nghệ thuật.",
    ]
  }
];


export const EXPERT_SOCIALS = {
  facebook: 'http://www.facebook.com/lecongnang86/',
  tiktok: 'http://www.tiktok.com/@suca.lcn',
  messenger: 'https://m.me/lecongnang86',
};

export const EXPERT_TITLES = [
  'Chủ tịch Diễn đàn Doanh nhân Việt Nam',
  'Chủ tịch HĐQT WonderTour',
  'Chủ nhiệm: AI FOR BUSINESS, AI FOR CEO, AI FOR EXPERT, AI FOR KOLS',
  'Quán quân Gala cười 2005 trên VTV3',
  'Giảng viên đại học chuyên ngành truyền thông, marketing, sự kiện',
  'Đào tạo thực chiến hàng ngàn chuyên gia, chủ doanh nghiệp',
];

export const ASSISTANTS = [
  { name: 'VIP MARCOM', href: 'https://chatgpt.com/g/g-685e4f1bb30c8191af27415822202061-vip-marcom' },
  { name: 'VIP DESIGNER', href: 'https://chatgpt.com/g/g-685e6bcede0881919d7d8cffe67aed50-vip-designer' },
  { name: 'VIP CONTENT', href: 'https://chatgpt.com/g/g-685e4f1bb30c8191af27415822202061-vip-marcom' },
  { name: 'VIP PROMPT', href: 'https://chatgpt.com/g/g-685e654c66e48191ba0125b891702d59-vip-video-prompt' },
  { name: 'VIP LEGAL', href: 'https://chatgpt.com/g/g-68627785b2b08191874c5aa081117a77-tro-ly-hanh-chinh-phap-che' },
  { name: 'VIP PLANNER', href: 'https://chatgpt.com/g/g-686279b076f88191aa85756dc1de1dca-tro-ly-cong-vu' },
];

export const TRAININGS = [
    { name: 'AI FOR EXPERT', description: 'Chương trình huấn luyện chuyên sâu cho chuyên gia.' },
    { name: 'AI FOR BUSINESS', description: 'Ứng dụng AI để tối ưu hóa hoạt động kinh doanh.' },
    { name: 'AI FOR CEO', description: 'Chiến lược AI dành cho các nhà lãnh đạo cấp cao.' },
    { name: 'AI FOR KOLs', description: 'Xây dựng thương hiệu cá nhân với sự hỗ trợ của AI.' },
    { name: 'AI FOR ART', description: 'Sáng tạo nghệ thuật không giới hạn cùng AI.' },
    { name: 'AI FOR INCOME', description: 'Tạo ra nguồn thu nhập mới từ các công cụ AI.' },
];

export const RECOMMENDED_ACCOUNTS = [
    { 
        name: 'Google Pro/Ultra (Gemini, VEO, Whisk...)', 
        href: 'https://m.me/lecongnang86',
        description: 'Bộ công cụ AI toàn diện từ Google cho tìm kiếm, tạo video và lên kế hoạch thông minh.'
    },
    { 
        name: 'ChatGPT (ChatGPT, Sora)', 
        href: 'https://m.me/lecongnang86',
        description: 'Trợ lý ngôn ngữ hàng đầu và công cụ tạo video đột phá từ OpenAI.'
    },
    { 
        name: 'Kling', 
        href: 'https://m.me/lecongnang86',
        description: 'Công cụ tạo video AI chất lượng cao, dễ dàng biến ý tưởng thành video sống động.'
    },
    { 
        name: 'Pixverse', 
        href: 'https://m.me/lecongnang86',
        description: 'Nền tảng sáng tạo video AI, tạo video chuyên nghiệp từ văn bản và hình ảnh.'
    },
    { 
        name: 'Heygen', 
        href: 'https://m.me/lecongnang86',
        description: 'Tạo video phát ngôn viên AI chuyên nghiệp với tính năng đồng bộ môi và đa ngôn ngữ.'
    },
    { 
        name: 'Bot AI Make', 
        href: 'https://ai.aimake.vn/lecongnang',
        description: 'Nền tảng tự động hóa và chatbot AI giúp tối ưu hóa quy trình làm việc và tương tác khách hàng.'
    },
];

export const COMMUNITY_LINK = 'https://web.facebook.com/share/g/1FuHL4TVtN/';