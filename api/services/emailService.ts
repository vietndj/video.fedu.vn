export interface SendActivationEmailParams {
  name: string;
  email: string;
  phone: string;
  transactionId?: string;
  skoolUrl?: string;
  price?: string;
}

export function generateActivationEmailHtml({
  name,
  email,
  phone,
  transactionId = "Chuyển khoản SePay/VietQR",
  skoolUrl = "https://www.skool.com/nguyenducviet-8640",
  price = "599.000đ",
}: SendActivationEmailParams): string {
  const studentName = name?.trim() || "bạn";
  const supportZalo = "https://zalo.me/0934688632";
  const instructorPhone = "0934.688.632";

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xác nhận học phí & Link vào lớp quay video</title>
  <style>
    @font-face {
      font-family: 'Acta';
      src: url('https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/fonts/SVN-Acta.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Aeonik';
      src: url('https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/fonts/SVN-AEONIK-REGULAR.TTF') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'SVN-Sonoma';
      src: url('https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/fonts/SVN-Sonoma-Bold.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
    }
    a, a:link, a:visited, a:hover, a span {
      color: #1a73e8 !important;
      text-decoration: underline !important;
    }
    .cta-btn, .cta-btn span {
      color: #ffffff !important;
      text-decoration: none !important;
    }
    a[x-apple-data-detectors], a[x-apple-data-detectors] * {
      color: #1a73e8 !important;
      text-decoration: underline !important;
    }
    u + #body a {
      color: #1a73e8 !important;
    }
    #MessageViewBody a {
      color: #1a73e8 !important;
    }
  </style>
</head>
<body id="body" style="margin: 0; padding: 0; background-color: #f1f3f6; font-family: 'Aeonik', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f3f6; padding: 32px 12px;">
    <tr>
      <td align="center">
        
        <!-- Khung Card Slide: Nền trắng tinh khiết #ffffff chuẩn Figma Slide DS 2.0 -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 36px rgba(15, 23, 42, 0.07);">
          
          <!-- Top Header chuẩn Slide: Dàn 2 đầu -->
          <tr>
            <td style="padding: 16px 28px; background-color: #fafbfc; border-bottom: 1px solid #edf2f7;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.14em; text-transform: uppercase;">
                    2026 • TƯ DUY LÀM VIDEO ĐIỆN THOẠI
                  </td>
                  <td align="right" style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 11px; font-weight: 700; color: #1a73e8; letter-spacing: 0.08em;">
                    ZALO : ${instructorPhone}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tiêu đề chính: Font Acta đồng nhất 1 màu đen than chì #0f172a -->
          <tr>
            <td style="padding: 34px 28px 20px 28px;">
              <div style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #1a73e8; margin-bottom: 10px;">
                <span style="opacity: 0.4;">// </span>XÁC NHẬN ĐĂNG KÝ HỌC VIÊN
              </div>

              <h1 style="margin: 0 0 14px 0; font-family: 'Acta', 'SVN-Acta', Georgia, serif; font-size: 26px; line-height: 1.25; font-weight: 600; color: #0f172a; letter-spacing: -0.02em;">
                Chào ${studentName},<br>
                mình nhận được học&nbsp;phí&nbsp;rồi&nbsp;nhé.
              </h1>

              <p style="margin: 0; font-size: 15.5px; line-height: 1.7; color: #475569;">
                Khoản học phí <strong style="color: #0f172a; font-weight: 700;">${price}</strong> của bạn đã được xác nhận thành công (Mã GD: <span style="font-family: monospace; color: #64748b;">${transactionId}</span>). Cảm ơn bạn rất nhiều vì đã tin tưởng đồng hành cùng mình trong khóa học <strong>Tư Duy Làm Video Điện Thoại: Quay Là Cuốn</strong>.
              </p>
            </td>
          </tr>

          <!-- CTA Button Chính: Hướng dẫn vào lớp Skool mở 2 khóa học -->
          <tr>
            <td style="padding: 0 28px 28px 28px;">
              <div style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px 20px; text-align: center;">
                <div style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 12px; font-weight: 700; color: #16a34a; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px;">
                  ✓ ĐÃ KÍCH HOẠT LỜI MỜI MỞ 2 KHÓA HỌC
                </div>
                <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: 600; color: #0f172a; line-height: 1.6;">
                  Hệ thống Skool đã gửi 1 email thư mời riêng vào hòm thư của bạn:<br>
                  <span style="color: #1a73e8;">Nguyen Viet invited you to join Logic Design & Edit</span>
                </p>
                <p style="margin: 0 0 18px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                  Bạn chỉ cần mở email đó từ Skool và bấm vào nút vàng <strong>JOIN NOW</strong> là 2 khóa học thực chiến sẽ được tự động mở khóa ngay lập tức (không cần gửi yêu cầu xét duyệt vào nhóm)!
                </p>
                <a href="https://mail.google.com" target="_blank" class="cta-btn" style="display: inline-block; background-color: #1a73e8; color: #ffffff !important; text-decoration: none !important; font-size: 15px; font-weight: 700; padding: 15px 36px; border-radius: 10px; letter-spacing: 0.03em; box-shadow: 0 4px 16px rgba(26, 115, 232, 0.35);">
                  <span style="color: #ffffff !important; text-decoration: none !important;">MỞ HỘP THƯ EMAIL ĐỂ VÀO LỚP (BẤM JOIN NOW) →</span>
                </a>
                <p style="margin: 14px 0 0 0; font-size: 13px; color: #64748b;">
                  Email nhận lời mời: <a href="mailto:${email}" style="color: #1a73e8 !important; text-decoration: underline !important; font-weight: 600;"><span style="color: #1a73e8 !important; text-decoration: underline !important;">${email}</span></a>
                </p>
                <p style="margin: 8px 0 0 0; font-size: 12.5px;">
                  <a href="https://www.skool.com/nguyenducviet-8640/classroom" target="_blank" style="color: #64748b !important; text-decoration: underline !important;">
                    Hoặc bấm vào đây nếu bạn đã kích hoạt tài khoản Skool trước đó →
                  </a>
                </p>
              </div>
            </td>
          </tr>

          <!-- LỘ TRÌNH 4 BƯỚC / 2 KHÓA TRÊN SKOOL (ĐỂ KHÔNG BỊ NGỢP) -->
          <tr>
            <td style="padding: 0 28px 30px 28px;">
              <div style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #64748b; margin-bottom: 16px;">
                <span style="opacity: 0.4;">// </span>LỘ TRÌNH HỌC TẬP (ĐỂ KHÔNG BỊ NGỢP)
              </div>

              <!-- Container 4 Blocks -->
              <div style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 20px 20px;">
                
                <!-- Block 1 -->
                <div style="padding-bottom: 14px; border-bottom: 1px solid #e2e8f0;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #eff6ff; color: #1a73e8; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bfdbfe;">01</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Khóa 1: Nền tảng CapCut (Cày đủ giờ bay)</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">Nếu bạn chưa thạo app, cứ vào đây thực hành trước để làm chủ thao tác tay, quen giao diện cắt ghép và tự tin xử lý footage cơ bản.</div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Block 2 -->
                <div style="padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #eff6ff; color: #1a73e8; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bfdbfe;">02</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Khóa 2: Cốt lõi thực chiến (Kỹ nghệ giấu vết cắt)</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">Nơi chứa trọn bộ tinh hoa: các kỹ thuật chuyển cảnh vật lý mượt mà đến vô lý, khuôn mẫu kịch bản giữ chân người xem và công cụ AI hỗ trợ.</div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Block 3 -->
                <div style="padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #f0fdf4; color: #16a34a; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bbf7d0;">03</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Khóa học "sống" — Cập nhật kỹ thuật mới liên tục</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">Mỗi lần có kỹ thuật quay mới hay giải pháp tối ưu, mình sẽ lên bài thông báo ngay ngoài Community và bổ sung video thẳng vào Khóa 2.</div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Block 4 -->
                <div style="padding-top: 14px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #f0fdf4; color: #16a34a; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bbf7d0;">04</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Sửa góc máy & video 1:1 cùng anh Việt</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">
                          Đang quay mà vướng mắc góc máy hay ánh sáng chỗ nào, cứ nhắn thẳng <a href="${supportZalo}" target="_blank" style="color: #1a73e8 !important; font-weight: 600; text-decoration: underline !important;">Zalo (${instructorPhone})</a> hoặc <a href="https://facebook.com/nddviet" target="_blank" style="color: #1a73e8 !important; font-weight: 600; text-decoration: underline !important;">Facebook</a>. Mình trực tiếp xem và chỉ rõ từng nhịp chùng để video cuốn nhất!
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

              </div>
            </td>
          </tr>

          <!-- Quote & Lời kết & Chữ ký -->
          <tr>
            <td style="padding: 0 28px 32px 28px;">
              <!-- Quote Block chuẩn phong cách anh Việt -->
              <div style="border-left: 3px solid #1a73e8; background-color: #f8fafc; border-radius: 0 8px 8px 0; padding: 14px 18px; margin-bottom: 22px;">
                <p style="margin: 0; font-family: 'Acta', Georgia, serif; font-size: 16px; font-style: italic; line-height: 1.6; color: #0f172a;">
                  “Quay phim đâu phải ngẫu nhiên<br>
                  Tư duy đi trước, kiếm tiền mới nhanh!”
                </p>
              </div>

              <p style="margin: 0 0 6px 0; font-size: 15px; color: #475569;">
                Chúc bạn sớm ra lò những video cực "cuốn" nhé!<br>
                Hẹn gặp bạn trong lớp,
              </p>
              <p style="margin: 0; font-family: 'Acta', Georgia, serif; font-size: 19px; font-weight: 600; color: #0f172a;">
                Nguyễn Đức Việt
              </p>
            </td>
          </tr>

          <!-- Footer chuẩn Slide Figma: Dàn đều 2 đầu -->
          <tr>
            <td style="padding: 16px 28px; background-color: #fafbfc; border-top: 1px solid #edf2f7;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size: 12.5px; color: #64748b;">
                    Mentor: <strong>Nguyễn Đức Việt</strong> · <a href="${supportZalo}" target="_blank" style="color: #1a73e8 !important; text-decoration: underline !important;">Zalo: ${instructorPhone}</a>
                  </td>
                  <td align="right" style="font-size: 12px; color: #94a3b8;">
                    Hỗ trợ học viên 24/7
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendCourseActivationEmail(params: SendActivationEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Resend] Warning: RESEND_API_KEY is not defined. Email will not be sent.");
    return { success: false, error: "RESEND_API_KEY missing" };
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || "Tư Duy Làm Video Điện Thoại <viet@fedu.vn>";
  const html = generateActivationEmailHtml(params);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [params.email],
        subject: `Xác nhận học phí & Link vào lớp quay video của anh Việt`,
        html: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Resend] Error sending activation email:", data);
      return { success: false, error: data };
    }

    console.log(`[Resend] Successfully sent activation email to ${params.email}, id: ${data?.id}`);
    return { success: true, data };
  } catch (error: any) {
    console.error("[Resend] Unexpected exception:", error);
    return { success: false, error: error.message || error };
  }
}
