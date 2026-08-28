import type { VercelRequest, VercelResponse } from '@vercel/node';

declare const process: any;
const SEPAY_API_KEY = process.env.SEPAY_API_KEY ?? "";
const COURSE_AMOUNT = 599000;
const FB_VERIFY_TOKEN = 'vietmac_ai_meta_secret_2026';
const FB_PAGE_ACCESS_TOKEN = 'EAAegdQqWEkwBSQxUkVrG1rHI2DmOaH2JPlUi6WMfQmjZBaVEmheVnXXC4etBFtxiA0od4qS3YAs8Dph2MxlXBAGx5bgAqOmZBgjJVKxv6559xhx0aw6B6ld6NmzE8wlFJZCUzAisoKFg2QwwSVY3eDK11vK07jmSRggQyXuoVHkU71YT0EY04ydQWQpYZBUUOEWZCeWYofP5naLsf2bcZD';
const TELEGRAM_BOT_TOKEN = '8715535213:AAHx7g6bQfMECdP0lBewAh6d4RV6FnKvNog';
const TELEGRAM_CHAT_ID = '2050406425';

interface SePayTransaction {
  id: string;
  bank_brand_name: string;
  account_number: string;
  transaction_date: string;
  amount_in: string;
  amount_out: string;
  transaction_content: string;
  reference_number: string;
}

interface SePayResponse {
  status: number;
  transactions?: SePayTransaction[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // ─── 1. META WEBHOOK GET HANDSHAKE ──────────────────────────────────────────
  const query = (req.query || {}) as any;
  const hub = query.hub || {};
  const rawUrl = req.url || '';
  const searchParams = new URL(rawUrl, 'https://video.fedu.vn').searchParams;

  const mode = query['hub.mode'] || hub.mode || searchParams.get('hub.mode') || query.mode;
  const token = query['hub.verify_token'] || hub.verify_token || searchParams.get('hub.verify_token') || query.token;
  const challenge = query['hub.challenge'] || hub.challenge || searchParams.get('hub.challenge') || query.challenge;

  if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
    console.log('[Meta Webhook Verified Successfully]:', challenge);
    return res.status(200).send(challenge);
  }

  // ─── 2. META WEBHOOK POST EVENTS ───────────────────────────────────────────
  if (req.method === 'POST') {
    const body = req.body || {};
    if (body.object === 'page') {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === 'feed' && change.value) {
            const val = change.value;
            if (val.item === 'comment' && val.verb === 'add') {
              const commentId = val.comment_id;
              const senderName = val.from?.name || 'Khách hàng';
              const messageText = (val.message || '').trim();
              const postId = val.post_id;

              const lower = messageText.toLowerCase();
              const isBuying = lower.includes('giá') || lower.includes('bao nhiêu') || lower.includes('học phí') || lower.includes('mua') || lower.includes('đăng ký') || lower.includes('lớp') || lower.includes('offline') || lower.includes('skool') || lower.includes('tư vấn') || lower.includes('khóa');
              const isGift = lower.includes('xin') || lower.includes('file') || lower.includes('preset') || lower.includes('sfx') || lower.includes('gốc') || lower.includes('prompt') || lower.includes('mic') || lower.includes('gocmay') || lower.includes('1') || lower.includes('quan tam') || lower.includes('capcut');

              try {
                await fetch(`https://graph.facebook.com/v21.0/${commentId}/likes?access_token=${FB_PAGE_ACCESS_TOKEN}`, { method: 'POST' });
              } catch(e) {}

              if (isBuying) {
                try {
                  await fetch(`https://graph.facebook.com/v21.0/${commentId}/comments?access_token=${FB_PAGE_ACCESS_TOKEN}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: `Chào bạn ${senderName}, mình đã gửi thông tin chi tiết qua tin nhắn riêng cho bạn rồi nhé!` })
                  });
                } catch(e) {}

                try {
                  const dmText = `Chào bạn ${senderName}, mình là trợ lý của anh Việt.\n\nKhóa học "Tư Duy Quay & Edit Video Bằng Điện Thoại" đang có ưu đãi 599.000đ (học online xem lại trọn đời trên Skool + 5 bộ quà tặng).\n\n👉 Bạn xem chi tiết lộ trình và quà tặng tại đây nhé: https://video.fedu.vn\n\nBạn cần hỗ trợ gì thêm cứ nhắn ở đây, anh Việt và đội ngũ sẽ hỗ trợ bạn ngay nhé!`;
                  await fetch(`https://graph.facebook.com/v21.0/${commentId}/private_replies?access_token=${FB_PAGE_ACCESS_TOKEN}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: dmText })
                  });
                } catch(e) {}

                try {
                  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: TELEGRAM_CHAT_ID,
                      text: `⚡ <b>CƠ HỘI CHỐT ĐƠN MỚI</b> ⚡\n\n👤 <b>Khách:</b> ${senderName}\n💬 <b>Comment:</b> "${messageText}"\n📍 <b>Post ID:</b> ${postId}\n🤖 <i>Bot đã like, reply và gửi DM link video.fedu.vn</i>\n\n👉 <b>Anh Việt & Đội Sales hãy vào Messenger chăm sóc khách ngay!</b>`,
                      parse_mode: 'HTML'
                    })
                  });
                } catch(e) {}

              } else if (isGift) {
                try {
                  await fetch(`https://graph.facebook.com/v21.0/${commentId}/comments?access_token=${FB_PAGE_ACCESS_TOKEN}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: `Chào ${senderName}, mình đã gửi tài liệu qua tin nhắn cho bạn rồi nhé!` })
                  });
                  const dmText = `Chào ${senderName}, tài liệu hướng dẫn và quà tặng làm video của anh Việt gửi bạn ở đây nhé: https://video.fedu.vn\n\nChúc bạn có những thước phim thật đẹp!`;
                  await fetch(`https://graph.facebook.com/v21.0/${commentId}/private_replies?access_token=${FB_PAGE_ACCESS_TOKEN}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: dmText })
                  });
                  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: TELEGRAM_CHAT_ID,
                      text: `🎁 <b>Khách Xin Tài Liệu</b>\n\n👤 <b>Khách:</b> ${senderName}\n💬 <b>Comment:</b> "${messageText}"\n✅ <i>Bot đã tự động gửi quà vào DM</i>`,
                      parse_mode: 'HTML'
                    })
                  });
                } catch(e) {}
              } else {
                try {
                  await fetch(`https://graph.facebook.com/v21.0/${commentId}/comments?access_token=${FB_PAGE_ACCESS_TOKEN}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: `Cảm ơn ${senderName} đã theo dõi chia sẻ của anh Việt nhé! Chúc bạn ngày mới nhiều năng lượng.` })
                  });
                } catch(e) {}
              }
            }
          }
        }
      }
      return res.status(200).json({ status: 'EVENT_RECEIVED' });
    }
    return res.status(200).json({ status: 'OK' });
  }

  // ─── 3. SEPAY PAYMENT CHECK (GET) ──────────────────────────────────────────
  try {
    const since = req.query.since as string;
    const phone = req.query.phone as string;

    if (!since || !phone) {
      return res.status(200).json({ found: false });
    }

    const sinceMs = parseInt(since, 10) - 15 * 60 * 1000;

    if (!SEPAY_API_KEY) {
      console.warn("SEPAY_API_KEY environment variable is not configured.");
      return res.status(200).json({ found: false });
    }

    const sepayRes = await fetch("https://my.sepay.vn/userapi/transactions/list?limit=20", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${SEPAY_API_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (!sepayRes.ok) {
      console.error(`SePay list API failed with status ${sepayRes.status}`);
      return res.status(200).json({ found: false });
    }

    const data = await sepayRes.json() as SePayResponse;

    if (!data.transactions) {
      return res.status(200).json({ found: false });
    }

    const searchPhone = phone.replace(/^0+/, '').replace(/[\s\-]/g, '');

    const match = data.transactions.find((tx) => {
      const amountIn = parseFloat(tx.amount_in);
      const txTimeString = tx.transaction_date.trim() + "+07:00";
      const txTime = new Date(txTimeString).getTime();
      const content = (tx.transaction_content || "").toLowerCase().replace(/[\s\-]/g, '');
      const hasPhone = content.includes(searchPhone);
      return amountIn === COURSE_AMOUNT && txTime >= sinceMs && hasPhone;
    });

    if (match) {
      return res.status(200).json({ found: true, transaction: match });
    }

    return res.status(200).json({ found: false });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to check payment", details: err.message });
  }
}
