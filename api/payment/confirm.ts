import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendCourseActivationEmail } from '../services/emailService';

const DEFAULT_TELEGRAM_BOT_TOKEN = "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c";
const DEFAULT_TELEGRAM_CHAT_ID = "2050406425";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3s4V-cItvUcM3g-oZy0mAWsxGXr9UhLhz_qPgXWZgFNTT9KgKZxu391m-aRv8rz8U/exec";

async function sendTelegramAlert(text: string, replyMarkup?: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  try {
    const payload: any = {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    };
    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const { name = "", phone = "", email = "", url = "", transactionId = "", rowIndex } = req.body || {};

    const cleanPhone = (phone || "").replace(/[\s\.\-\+]/g, "").trim();
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith("84")) normalizedPhone = "0" + normalizedPhone.slice(2);

    // ── 1. Cập nhật trạng thái trong Google Sheet qua Google Apps Script ──
    let updateData: any = {};
    if (GOOGLE_SCRIPT_URL) {
      try {
        const payload = {
          action: "update_status",
          phone: normalizedPhone || phone,
          status: "Đã thanh toán"
        };

        const updateRes = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const contentType = updateRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          updateData = await updateRes.json();
        } else {
          const text = await updateRes.text();
          console.warn(`Google Script confirm status returned text: ${text.substring(0, 100)}, status: ${updateRes.status}`);
        }
      } catch (scriptErr) {
        console.error("Failed to update Google Sheet:", scriptErr);
      }
    }

    const customerEmail = (updateData.email || email || "").trim();
    const customerName = (updateData.name || name || "").trim();

    // ── 2. Bắn thông báo Telegram (Cùng bot, phân biệt rõ nguồn VIDEO.FEDU.VN) ──
    const teleMsg = `💰 <b>[THANH TOÁN THÀNH CÔNG]</b>
━━━━━━━━━━━━━━━━━━━━
🌐 <b>NGUỒN WEB:</b> <b>VIDEO.FEDU.VN</b>
👤 <b>Học viên:</b> ${customerName || "Khách hàng"}
📱 <b>SĐT:</b> ${normalizedPhone}
📧 <b>Email:</b> ${customerEmail || "Chưa cung cấp"}
💵 <b>Học phí:</b> 599.000 VNĐ
🔖 <b>Mã GD:</b> ${transactionId || "Chuyển khoản SePay/VietQR"}
📚 <b>Khóa học:</b> Tư Duy Làm Video Điện Thoại: Quay Là Cuốn
━━━━━━━━━━━━━━━━━━━━
⚡ <b>Lệnh Skool:</b> Tự động mời qua hệ thống Mac...`;

    const replyMarkup = customerEmail ? {
      inline_keyboard: [
        [
          { text: "⚡ Duyệt Skool (Tự động)", callback_data: `invite:${customerEmail}` },
          { text: "📋 Copy Email", copy_text: { text: customerEmail } }
        ],
        [
          { text: "🌐 Mở trang Invite Skool", url: "https://www.skool.com/nguyenducviet-8640" }
        ]
      ]
    } : undefined;

    await sendTelegramAlert(teleMsg, replyMarkup);

    // ── 3. Gửi Email kích hoạt trực tiếp qua Resend API (Chuẩn DS Figma Slide 2.0) ──
    if (customerEmail) {
      try {
        console.log(`Sending activation email via Resend to ${customerEmail}...`);
        await sendCourseActivationEmail({
          name: customerName,
          email: customerEmail,
          phone: normalizedPhone,
          transactionId: transactionId || "Chuyển khoản SePay/VietQR",
          price: "599.000đ",
        });
      } catch (mailErr) {
        console.error("Resend email error:", mailErr);
      }

      // ── 4. Kích hoạt tự động mời Skool 100% qua Realtime Queue (Zero-Click) ──
      try {
        console.log(`Pushing auto-invite event to realtime queue for ${customerEmail}...`);
        await fetch("https://ntfy.sh/fedu_skool_auto_invite_vietmac_tpbank888041", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Title": "Skool Auto Invite" },
          body: JSON.stringify({
            email: customerEmail,
            name: customerName,
            source: "video.fedu.vn",
            transactionId: transactionId || "MANUAL",
            timestamp: Date.now()
          })
        });
      } catch (qErr) {
        console.error("Failed to push auto-invite event:", qErr);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Error confirming payment:", err);
    return res.status(500).json({ error: "Failed to confirm payment", details: err.message });
  }
}
