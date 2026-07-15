import { createContext, useContext, createElement } from "react";
import type { ReactNode } from "react";

export interface BlocksMeta {
  order: string[];
  hidden: string[];
  media: Record<string, any[]>;
  custom: Record<string, { title: string; body: string }>;
}

export interface SkillCard {
  n: string;
  title: string;
  desc: string;
  warn?: string;
  gif?: string;
  youtubeId?: string;
  aspectRatio?: string;
}
export interface Stage { n: string; title: string; sub?: string; desc?: string; gif?: string }
export interface ValueLine { label: string; price: string }

export interface PageContent {
  _v?: number;
  price: string;
  value: string;

  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroAccentLine: string;
  heroSub: string;
  heroCta: string;
  heroSubPrice?: string;
  heroVideoYoutubeId?: string;
  heroPoem?: string[];

  painLabel: string;
  painHeading: string;
  painQuote: string;
  painSub: string;
  pains: string[];
  painConclusion?: string;

  // ── Attention (3 cách gây chú ý) ──
  attentionLabel: string;
  attentionHeading: string;
  attentionPara: string;
  attentionItems: { icon: string; title: string; desc: string }[];

  // ── Rule 7-11-4 ──
  ruleLabel: string;
  ruleHeading: string;
  rulePara: string;
  ruleItems: { fail: string; why: string }[];
  ruleConclusion: string;

  cycleLabel: string;
  cycleHeading: string;
  cyclePara: string;
  cycleItems: { fail: string; why: string }[];
  
  discoveryLabel: string;
  discoveryHeading: string;
  discoverySub: string;
  discoveryItems: { title: string; desc: string }[];

  solutionLabel: string;
  solutionHeading: string;
  solutionSub: string;
  solutionItems: string[];

  skillsLabel: string;
  skillsHeading: string;
  skillCards: SkillCard[];

  midCtaHeading: string;
  midCtaSub: string;
  midCtaBtn: string;

  baLabel: string;
  baHeading: string;
  baSub: string;
  baBeforeMedia?: string;
  baAfterMedia?: string;
  beforeLabel: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];

  roadmapLabel: string;
  roadmapHeading: string;
  roadmapPreviewHeading?: string;
  roadmapPreviewDesc?: string;
  roadmapIframeUrl?: string;
  roadmapChaptersHeading?: string;
  stages: Stage[];

  instructorLabel: string;
  instructorHeading: string;
  instructorInitials: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string[];
  instructorInsight?: string;

  urgencyBar: string;
  ctaLabel: string;
  ctaHeading: string;
  ctaSub: string;
  countdownLabel: string;
  valueStackTitle: string;
  valueStack: ValueLine[];
  guarantee: string;

  footerBrand: string;
  footerDot: string;
  footerTagline: string;
  footerLinks: string[];
  bonusLabel: string;
  bonusHeading: string;
  bonusSub: string;
  bonusItems: { id: string; title: string; desc: string; audioDemo?: string }[];

  blocksMeta: BlocksMeta;
}

const CONTENT_SCHEMA_VERSION = 7;

export const DEFAULT_CONTENT: PageContent = {
  _v: CONTENT_SCHEMA_VERSION,
  price: "599.000",
  value: "3.250.000",

  // ── Hero ──
  heroBadge: "Dành cho người xây kênh ghét kỹ xảo màu mè",
  heroHeadline1: "Kỹ Nghệ 'Giấu Vết Cắt'.",
  heroHeadline2: "Tự tay tạo ra thước phim\nmượt đến vô lý chỉ bằng điện thoại.",
  heroPoem: [
    "Không cần máy ảnh cồng kềnh,",
    "Góc quay hướng sáng, tạo kênh mượt mà."
  ],
  heroAccentLine: "Thứ tạo ra video 'sướng mắt' không phải phần mềm hay điện thoại đời mới.",
  heroSub: "Phần lớn người làm video không kém về ý tưởng. Họ kém vì không biết đặt điểm cắt ở đâu, đặt đèn ở đâu, và đổi cỡ cảnh lúc nào. Khóa học này giải quyết đúng ba thứ đó.",
  heroCta: "SỞ HỮU BÍ QUYẾT CHUYỂN CẢNH NGAY",
  heroVideoYoutubeId: "CaDZiACYrV8",
  heroSubPrice: "(Học Online mọi lúc, mọi nơi, xem lại trọn đời. Chỉ cần Điện thoại)",

  // ── Pain (Nỗi đau) ──
  painLabel: "DẤU HIỆU NHẬN BIẾT",
  painHeading: "Bạn cắt ghép rất nhanh, nhưng xem lại vẫn thấy bị \"sượng\"?",
  painQuote: "Sự mượt mà của một thước phim không đến từ hiệu ứng app — nó đến từ việc biết đặt điểm cắt đúng chỗ, ánh sáng đúng hướng, và đổi cỡ cảnh đúng lúc.",
  painSub: "Ba triệu chứng phổ biến khiến video của bạn trông \"nghiệp dư\" dù bạn đã rất chăm chỉ:",
  pains: [
    "❌ Cắt cảnh giật cục làm nhức mắt — vết cắt lộ ra giữa hai cảnh không ăn khớp về chuyển động.",
    "❌ Lạm dụng hiệu ứng lật trang 3D giả tạo — dùng transition của CapCut như một cái chống đỡ, làm video mất đi sự tự nhiên.",
    "❌ Góc máy đứng im, mặt tối om phẳng lì — một setup duy nhất từ đầu đến cuối, không có điểm nhìn mới để mắt khán giả bám vào."
  ],

  // ── Attention (3 cách gây chú ý) ──
  attentionLabel: "BA CÁCH GÂY CHÚ Ý PHỔ BIẾN NHẤT",
  attentionHeading: "Ba thứ khiến não bộ không thể không nhìn",
  attentionPara: "Trong cuộc sống hay trên video, não người phản ứng y hệt nhau. Và ai làm nội dung cũng biết ba thứ này.",
  attentionItems: [
    {
      icon: "✦",
      title: "Nội dung gợi cảm",
      desc: "Gặp người thu hút ngoài phố, mắt tự quay sang — đó là phản xạ, não đã quyết định trước rồi. View có, nhưng không ai dừng lại hỏi ‘bạn dạy gì vậy?’"
    },
    {
      icon: "✦",
      title: "Thông tin đe dọa",
      desc: "Ngoài đường có người đe dọa bạn, bạn không dám không chú ý. Trên video, tin cảnh báo kéo view rất mạnh — nhưng người xem đang phòng thủ, không phải tin tưởng."
    },
    {
      icon: "✦",
      title: "Xuất hiện kỳ lạ",
      desc: "Mặc bộ đồ hình quả trứng đi giữa phố, cả đường phải ngoái nhìn — nhưng họ nhớ cái bộ đồ, không nhớ người mặc là ai."
    }
  ],

  // ── Rule 7-11-4 ──
  ruleLabel: "LUẬT CHƠI TIẾP THỊ SỐ",
  ruleHeading: "Quy tắc 7-11-4: Vì sao video quyết định sự sống còn?",
  rulePara: "Một người lạ chỉ xuống tiền mua hàng khi họ đã tích lũy đủ 7 tiếng xem nội dung, qua 11 lần gặp trên 4 nền tảng. Để làm được điều đó, bạn cần:",
  ruleItems: [
    { 
      fail: "Video là ‘vỏ hộp đắt tiền’ nâng tầm uy tín", 
      why: "Trang sức bọc trong túi nilon thì ai cũng nghi ngờ. Kiến thức của bạn cũng cần một chiếc hộp nhung xứng tầm." 
    },
    { 
      fail: "Video tự động làm việc trên 4 nền tảng", 
      why: "Một video đăng lên TikTok, Reels, Shorts, YouTube cùng lúc — cày view ngay cả khi bạn đang ngủ." 
    },
    { 
      fail: "Cắt dựng quyết định người ta ở lại hay thoát ra", 
      why: "Video buồn tẻ thì có 7 tiếng cũng không ai xem. Tư duy cắt dựng giữ chân họ từ giây đầu tiên." 
    }
  ],
  ruleConclusion: "Khán giả sẽ không bao giờ kiên nhẫn ngồi xem một video mờ nhạt, giật cục hay âm thanh rè suốt 7 tiếng đồng hồ. Tư duy thẩm mỹ quay dựng chính là thứ giúp chuyển hóa nội dung thô thành trải nghiệm 'sướng mắt'.",

  // ── Section 3: Đập tan ảo giác ──
  cycleLabel: "VÒNG LẶP THỬ SAI",
  cycleHeading: "Sự mượt mà không sinh ra từ bộ lọc (filter) của phần mềm.",
  cyclePara: "Nhiều người nghĩ muốn video \"ảo diệu\" thì phải mua điện thoại đời mới nhất, hoặc tải các app có kỹ xảo đồ họa phức tạp.",
  cycleItems: [
    { 
      fail: "Ranh giới giữa \"Thợ bấm nút\" và \"Người chơi hệ hình ảnh\"", 
      why: "Sự khác biệt nằm ở Tư duy Không gian. Người chuyên nghiệp không lạm dụng hiệu ứng lấp lánh để lấp liếm. Họ biết cách mượn chính những chuyển động vật lý thật để đánh lừa thị giác." 
    }
  ],

  // ── Section 4: Giác ngộ chân lý ──
  discoveryLabel: "CÔNG THỨC THỊ GIÁC",
  discoveryHeading: "Sở hữu 3 ngón đòn đánh lừa thị giác ngay trên điện thoại.",
  discoverySub: "Mọi lý thuyết nghệ thuật phức tạp nhất đã được đóng gói thành 3 nguyên lý thực hành ra kết quả ngay:",
  discoveryItems: [
    {
      title: "Chuyển động Cơ học > Hiệu ứng App",
      desc: "Vứt bỏ các hiệu ứng lật trang 3D sến súa. Mượn đà của một cú lướt máy hay động tác tay, bạn sẽ ghép 10 clip lại với nhau mà mượt mà như chỉ quay đúng 1 lần.",
      gif: "/gifs/mechanical-cut.gif",
      placeholderLabel: "GIF Minh họa: Lướt tay che ống kính chuyển cảnh"
    },
    {
      title: "Điều phối Không gian > Đứng im một chỗ",
      desc: "Phá bỏ góc máy chết. Luân chuyển điệu nghệ giữa Cảnh Toàn và Cảnh Cận. Bạn đang tự tay dẫn dắt cảm xúc người xem mà không cần tốn một lời giải thích.",
      gif: "/gifs/spatial-direction.gif",
      placeholderLabel: "GIF Minh họa: Video luân chuyển Toàn - Trung - Cận"
    },
    {
      title: "Tôn khối Nghệ thuật > Ánh sáng Phẳng lì",
      desc: "Sự \"đắt tiền\" bắt nguồn từ cách bạn đánh sáng, không phải độ phân giải của camera. Tôn lên đường nét khuôn mặt chỉ với nguyên lý bóc tách 3D cơ bản.",
      gif: "/gifs/lighting-art.gif",
      placeholderLabel: "GIF Minh họa: Bật tắt đèn nền background tạo chiều sâu"
    }
  ],

  // ── Section 5: Solution ──
  solutionLabel: "TƯ DUY CỦA NGƯỜI CHƠI HỀ HÌNH ẢNH",
  solutionHeading: "Đừng cố sửa bằng hiệu ứng. Hãy dùng tư duy sắp xếp không gian.",
  solutionSub: "Để tạo ra sự lôi cuốn, bạn không cần app xịn. Bạn chỉ cần sở hữu 4 vũ khí không gian này:",
  solutionItems: [
    "❌ Cắt ghép giật cục ➞ ✅ Nối cảnh mượt mà: Ứng dụng kỹ thuật Cut-on-Action để khung hình liền mạch một cách tự nhiên.",
    "❌ Góc máy buồn ngủ ➞ ✅ Luân chuyển cỡ cảnh: Linh hoạt đưa ống kính từ Toàn cảnh đến Cận cảnh để liên tục làm mới ánh nhìn.",
    "❌ Bối cảnh 'hàng chợ' ➞ ✅ Đánh sáng nghệ thuật: Tạo chiều sâu 3D chuyên nghiệp chỉ với 2 chiếc đèn cơ bản.",
    "❌ Sự nhàm chán ➞ ✅ Làm chủ nhịp điệu: Bơm năng lượng liên tục mỗi 3 giây để giữ chặt khán giả đến tận giây cuối cùng."
  ],

  skillsLabel: "4 NGUYÊN LÝ KIẾN TRÚC KHUNG HÌNH",
  skillsHeading: "Bốn kỹ thuật hình ảnh được hệ thống hóa để bạn áp dụng ngay trên điện thoại:",
  skillCards: [
    { n: "01", title: "Điểm nối tàng hình (Cut-on-Action)", desc: "Mượn các chuyển động vật lý tự nhiên (vung tay, lướt đồ vật, bước chân) làm cầu nối giữa hai bối cảnh. Khán giả sẽ bị cuốn theo nhịp điệu và không hề nhận ra sự xuất hiện của vết cắt.", gif: "/gifs/invisible-cut.gif" },
    { n: "02", title: "Ánh sáng tôn khối 3D", desc: "Chỉ cần 2 chiếc đèn cơ bản đặt đúng góc (Key và Back light), khuôn mặt và bối cảnh sẽ lập tức có chiều sâu. Giải quyết triệt để tình trạng video bị phẳng lì và thiếu sinh khí.", gif: "/gifs/lighting-3d.gif" },
    { n: "03", title: "Điều hướng qua Cỡ cảnh", desc: "Luân chuyển có chủ đích giữa Cảnh Toàn, Trung và Cận để dẫn dắt sự chú ý của người xem. Đây là cách đơn giản nhất để video không bị nhàm chán dù bối cảnh không thay đổi.", gif: "/gifs/shot-sizes.gif" },
    { n: "04", title: "Bằng chứng thị giác (B-roll)", desc: "Không chỉ dùng để che vết cắt, cảnh trám (B-roll) đóng vai trò là minh họa trực quan. Khi lời nói đi đôi với hình ảnh thực tế, tính thuyết phục của video sẽ tăng lên mức tối đa.", youtubeId: "Ew-yWd0riEQ", aspectRatio: "9 / 16" }
  ],

  // ── Section 7: Mid CTA ──
  midCtaHeading: "Trải nghiệm cảm giác tự tay \"thao túng\" thị giác ngay hôm nay.",
  midCtaSub: "Đầu tư một lần, nắm trọn bí quyết của những khung hình đắt giá mà không cần mua thiết bị xịn.",
  midCtaBtn: "Nâng Cấp Gu Hình Ảnh Ngay",

  // ── Section 8: Before & After ──
  baLabel: "SỰ KHÁC BIỆT KHI CÓ TƯ DUY ĐÚNG",
  baHeading: "Sự khác biệt của việc nắm trong tay luật chơi hình ảnh:",
  baSub: "",
  baBeforeMedia: "",
  baAfterMedia: "",
  beforeLabel: "Cách cũ",
  afterLabel: "Cách mới",
  beforeItems: [
    "Cắt cảnh giật cục",
    "Ánh sáng mờ nhạt",
    "Lạm dụng hiệu ứng nhức mắt",
    "Góc máy chết đứng im gây nhàm chán",
    "Thiết bị đắt tiền nhưng setup sai góc sáng",
    "Nhạc nền đều đều, âm thanh chuyển cảnh sượng",
    "Nói vấp phải quay lại hoặc cắt jump-cut thô"
  ],
  afterItems: [
    "Nối cảnh tàng hình mượt mà",
    "Ánh sáng nghệ thuật có chiều sâu",
    "Nhịp điệu cuốn hút không một khoảng chết",
    "Luân chuyển cỡ cảnh giữ mắt người xem",
    "Tận dụng điện thoại và hướng sáng thông minh",
    "Âm thanh điện ảnh khớp nhịp điểm cắt",
    "Chèn cảnh phụ B-roll che lỗi vấp tinh tế"
  ],

  // ── Section 9: Lộ trình tinh gọn ──
  roadmapLabel: "LỘ TRÌNH THỰC CHIẾN",
  roadmapHeading: "Bên trong khóa học có gì?",
  roadmapPreviewHeading: "Trải nghiệm trực quan một bài học mẫu",
  roadmapPreviewDesc: "Đây là video thực tế nằm trong chương trình học của bạn — trực quan, đi thẳng vào bản chất vấn đề và cực kỳ dễ áp dụng.",
  roadmapIframeUrl: "https://www.youtube.com/embed/NmazSvfOs84?rel=0&modestbranding=1",
  roadmapChaptersHeading: "Hệ thống hóa toàn bộ tư duy làm video của bạn:",
  stages: [
    { n: "[1]", title: "Ảo thuật chuyển cảnh", desc: "Vứt bỏ hiệu ứng app sến súa. Học cách mượn chuyển động của đôi tay (vung tay, lướt đồ vật) để nối cảnh tàng hình, giấu nhẹm vết cắt.", sub: "Thực hành làm được ngay điểm nối tàng hình sau 15 phút" },
    { n: "[2]", title: "Phép màu ánh sáng", desc: "Xóa sổ không gian tối tăm, phẳng lì. Chỉ với 2 chiếc đèn giá rẻ, bạn tự setup được khung hình có chiều sâu 3D đắt tiền như studio.", sub: "Setup xong trong 10 phút, dùng mãi mãi" },
    { n: "[3]", title: "Tối ưu nhịp video", desc: "Không còn đặt điện thoại chết một chỗ. Linh hoạt đổi góc quay và nhịp độ mỗi 3 giây để ép khán giả không thể rời mắt.", sub: "Áp dụng ngay vào video tiếp theo, thấy khác biệt liền" },
    { n: "[4]", title: "Nghệ thuật chữa cháy", desc: "Lỡ miệng nói vấp? Không sao. Nắm bí quyết lồng ghép hình ảnh phụ để che lỗi tinh tế, giúp video trôi chảy từ đầu đến cuối.", sub: "Cứu được mọi đoạn hỏng mà không cần quay lại" }
  ],

  // ── Section 10: Instructor ──
  instructorLabel: "NGƯỜI ĐỒNG HÀNH",
  instructorHeading: "Quay phim có điểm dừng\ndựng phim có điểm chạm",
  instructorInitials: "NĐV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Kỹ sư Công nghệ Phần mềm (ĐH Bách Khoa). 15 năm Giảng viên Mỹ thuật đa phương tiện tại FPT Arena.",
  instructorBio: [
    "Mình không dạy bạn các mẹo vặt lắt nhắt mau quên. Mình sẽ hệ thống hóa các nguyên lý hình ảnh thành những bước thực hành đơn giản nhất, để bạn tận hưởng niềm vui khi tạo ra một thước phim đàng hoàng và lôi cuốn mọi ánh nhìn."
  ],

  // ── Bonus (Quà tặng) ──
  bonusLabel: "QUÀ TẶNG ĐI KÈM KHÔNG THỂ BỎ QUA",
  bonusHeading: "Tặng kèm kho \"đồ chơi\" nâng tầm khung hình trị giá 1.250.000đ",
  bonusSub: "Chỉ dành cho những ai đăng ký trong đợt này — không bán riêng lẻ",
  bonusItems: [
    {
      id: "01",
      title: "Kho 50+ Âm Thanh Điện Ảnh (SFX)",
      desc: "Nếu bạn chỉ đơn giản dùng tiếng Whoosh, Pop, Glitch, Impact có sẵn trong CapCut thì âm thanh sẽ không có lực, bị bẹt và cực kỳ đại trà.<br/><br/>Để video thực sự \"xịn\" như phim, bạn cần nhiều lớp âm thanh (layer) lồng ghép vào nhau. Trong thư viện này, mình đã tổng hợp sẵn:<br/><ul style=\"margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;\"><li>🔥 <b>Âm thanh có lực, sâu, đậm chất điện ảnh</b></li><li>🎧 <b>Sử dụng thoải mái, 100% sạch bản quyền (No Copyright)</b></li><li>✂️ <b>Chỉ cần dán vào đúng điểm cắt, khung hình tự động thăng cấp!</b></li></ul>"
    },
    {
      id: "02",
      title: "Kho Nhạc Nền \"MasterClass\" Độc Bản",
      desc: "Bạn có bao giờ chán nản vì dùng chung một bản nhạc nền với hàng ngàn video khác trên TikTok? Với thư viện nhạc nền \"MasterClass\" do chính tay mình sản xuất bằng AI chuyên dụng:<br/><ul style=\"margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;\"><li>🎼 <b>Giai điệu ĐỘC BẢN:</b> Cảm xúc mãnh liệt, hoàn toàn không đụng hàng.</li><li>✅ <b>Sạch bản quyền 100%:</b> Không bao giờ lo đánh gậy trên YouTube, TikTok hay Facebook.</li><li>🔄 <b>Sẵn sàng sử dụng:</b> Chỉ cần tải về dùng ngay và được cập nhật nhạc mới thường xuyên!</li></ul>",
      audioDemo: "/boardroom-siege.mp3"
    },
    {
      id: "03",
      title: "Sơ đồ Đánh Sáng 3 Điểm (Cho Phòng Nhỏ)",
      desc: "Cheat-sheet đặt góc đèn cho 5 kiểu phòng nhà ống điển hình. Tạo chiều sâu 3D ngay lập tức chỉ với 2 chiếc đèn giá rẻ."
    },
    {
      id: "04",
      title: "Bộ Prompt AI Kịch Bản & Chia Phân Cảnh (Shot-list)",
      desc: "Chỉ cần thả Prompt vào ChatGPT, AI sẽ tự động phân tách kịch bản của bạn thành các cỡ cảnh (Toàn - Trung - Cận) hợp lý nhất. Bạn chỉ việc vác máy lên quay."
    },
    {
      id: "05",
      title: "Checklist 15 Điểm QC Trước Khi Đăng",
      desc: "Bộ lọc kỹ thuật (Bitrate, tỷ lệ khung hình, chống rung) để đảm bảo video up lên luôn sắc nét, không bị nền tảng bóp tương tác."
    }
  ],

  // ── Section 11: Final CTA ──
  urgencyBar: "⚠ ĐẶC QUYỀN ĐĂNG KÝ HÔM NAY — CHỈ CÒN 599.000 VNĐ",
  ctaLabel: "// BƯỚC CUỐI CÙNG",
  ctaHeading: "Làm chủ tư duy quay dựng mượt mà ngay hôm nay.",
  ctaSub: "Trang bị gu thẩm mỹ đắt tiền cho những thước phim của bạn — chỉ với mức phí bằng đúng một bữa ăn tối. Từ video tiếp theo, bạn sẽ không còn nhìn lại màn hình và thấy 'sượng' nữa.",
  countdownLabel: "⏳ Ưu đãi kết thúc sau:",
  valueStackTitle: "TỔNG GIÁ TRỊ BẠN NHẬN ĐƯỢC:",
  valueStack: [
    { label: "Khóa học Video The Creator", price: "2.000.000 VNĐ" },
    { label: "Bộ 5 Quà Tặng Độc Quyền (Value Add)", price: "1.250.000 VNĐ" }
  ],
  guarantee: "Bảo hành chất lượng: Xem bài đầu tiên có thể tự tin cầm điện thoại quay được luôn.",

  // ── Footer ──
  footerBrand: "VIET",
  footerDot: ".",
  footerTagline: "\"Quay phim đâu phải ngẫu nhiên,\nTư duy đi trước, kiếm tiền mới nhanh!\"",
  footerLinks: [],
  footerCopyright: "COPYRIGHT 2026 | NGUYỄN ĐỨC VIỆT",

  blocksMeta: {
    order: ["hero", "pain", "attention", "rule", "cycle", "discovery", "solution", "skills", "midCta", "before-after", "roadmap", "instructor", "bonus", "cta", "footer"],
    hidden: ["attention", "rule", "discovery", "solutions", "solution"],
    media: {},
    custom: {},
  },
};

export const ContentCtx = createContext<PageContent>(DEFAULT_CONTENT);

export function useContent(): PageContent {
  return useContext(ContentCtx);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  return createElement(ContentCtx.Provider, { value: DEFAULT_CONTENT }, children);
}
