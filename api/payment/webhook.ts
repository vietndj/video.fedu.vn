import type { VercelRequest, VercelResponse } from '@vercel/node';

const COURSE_AMOUNT = 599000;
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3s4V-cItvUcM3g-oZy0mAWsxGXr9UhLhz_qPgXWZgFNTT9KgKZxu391m-aRv8rz8U/exec";
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/mdc9dfwges9r1v06momkpboh9auhrtgu";

// Meta Facebook Config
const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'vietmac_ai_meta_secret_2026';
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN || 'EAAegdQqWEkwBSQxUkVrG1rHI2DmOaH2JPlUi6WMfQmjZBaVEmheVnXXC4etBFtxiA0od4qS3YAs8Dph2MxlXBAGx5bgAqOmZBgjJVKxv6559xhx0aw6B6ld6NmzE8wlFJZCUzAisoKFg2QwwSVY3eDK11vK07jmSRggQyXuoVHkU71YT0EY04ydQWQpYZBUUOEWZCeWYofP5naLsf2bcZD';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8715535213:AAHx7g6bQfMECdP0lBewAh6d4RV6FnKvNog';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '2050406425';

async function sendTelegramAlert(text: string) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error('[Telegram Alert Error]:', err);
  }
}

async function replyCommentPublic(commentId: string, message: string, token: string) {
  try {
    const url = `https://graph.facebook.com/v21.0/${commentId}/comments?access_token=${token}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    return await res.json();
  } catch (e) {
    console.error('[Reply Comment Error]:', e);
  }
}

async function likeComment(commentId: string, token: string) {
  try {
    const url = `https://graph.facebook.com/v21.0/${commentId}/likes?access_token=${token}`;
    await fetch(url, { method: 'POST' });
  } catch (e) {
    console.error('[Like Comment Error]:', e);
  }
}

async function sendPrivateDM(commentId: string, text: string, token: string) {
  try {
    const url = `https://graph.facebook.com/v21.0/${commentId}/private_replies?access_token=${token}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });
    return await res.json();
  } catch (e) {
    console.error('[Send Private DM Error]:', e);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ─── 1. META WEBHOOK GET HANDSHAKE ──────────────────────────────────────────
  if (req.method === 'GET') {
    const rawUrl = req.url || '';
    const searchParams = new URL(rawUrl, 'https://video.fedu.vn').searchParams;
    const hubNested = (req.query?.hub as any) || {};

    const mode = req.query['hub.mode'] || hubNested.mode || searchParams.get('hub.mode');
    const token = req.query['hub.verify_token'] || hubNested.verify_token || searchParams.get('hub.verify_token');
    const challenge = req.query['hub.challenge'] || hubNested.challenge || searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
      console.log('[Meta Webhook Verified Successfully]:', challenge);
      return res.status(200).send(challenge);
    }
    return res.status(200).json({ status: 'active', message: 'Webhook endpoint ready (SePay & Meta)' });
  }

  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};

  // ─── 2. META FACEBOOK EVENT PROCESSING (POST) ──────────────────────────────
  if (body.object === 'page') {
    console.log('[Meta Webhook Event Received]:', JSON.stringify(body));
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === 'feed' && change.value) {
          const val = change.value;
          if (val.item === 'comment' && val.verb === 'add') {
            const commentId = val.comment_id;
            const senderName = val.from?.name || 'Khách hàng';
            const messageText = (val.message || '').trim();
            const postId = val.post_id;

            console.log(`[New Comment from ${senderName}]: ${messageText}`);

            const lower = messageText.toLowerCase();
            const isBuying = lower.includes('giá') || lower.includes('bao nhiêu') || lower.includes('học phí') || lower.includes('mua') || lower.includes('đăng ký') || lower.includes('lớp') || lower.includes('offline') || lower.includes('skool') || lower.includes('tư vấn') || lower.includes('khóa');
            const isGift = lower.includes('xin') || lower.includes('file') || lower.includes('preset') || lower.includes('sfx') || lower.includes('gốc') || lower.includes('prompt') || lower.includes('mic') || lower.includes('gocmay') || lower.includes('1') || lower.includes('quan tam') || lower.includes('capcut');

            if (FB_PAGE_ACCESS_TOKEN) {
              await likeComment(commentId, FB_PAGE_ACCESS_TOKEN);

              if (isBuying) {
                await replyCommentPublic(commentId, `Chào bạn ${senderName}, mình đã gửi thông tin chi tiết qua tin nhắn riêng cho bạn rồi nhé!`, FB_PAGE_ACCESS_TOKEN);
                const dmText = `Chào bạn ${senderName}, mình là trợ lý của anh Việt.\n\nKhóa học "Tư Duy Quay & Edit Video Bằng Điện Thoại" đang có ưu đãi 599.000đ (học online xem lại trọn đời trên Skool + 5 bộ quà tặng).\n\n👉 Bạn xem chi tiết lộ trình và quà tặng tại đây nhé: https://video.fedu.vn\n\nBạn cần hỗ trợ gì thêm cứ nhắn ở đây, anh Việt và đội ngũ sẽ hỗ trợ bạn ngay nhé!`;
                await sendPrivateDM(commentId, dmText, FB_PAGE_ACCESS_TOKEN);

                await sendTelegramAlert(
                  `⚡ <b>CƠ HỘI CHỐT ĐƠN MỚI</b> ⚡\n\n` +
                  `👤 <b>Khách:</b> ${senderName}\n` +
                  `💬 <b>Comment:</b> "${messageText}"\n` +
                  `📍 <b>Post ID:</b> ${postId}\n` +
                  `🤖 <i>Bot đã like, reply và gửi DM link video.fedu.vn</i>\n\n` +
                  `👉 <b>Anh Việt & Đội Sales hãy vào Messenger chăm sóc khách ngay!</b>`
                );
              } else if (isGift) {
                await replyCommentPublic(commentId, `Chào ${senderName}, mình đã gửi tài liệu qua tin nhắn cho bạn rồi nhé!`, FB_PAGE_ACCESS_TOKEN);
                const dmText = `Chào ${senderName}, tài liệu hướng dẫn và quà tặng làm video của anh Việt gửi bạn ở đây nhé: https://video.fedu.vn\n\nChúc bạn có những thước phim thật đẹp!`;
                await sendPrivateDM(commentId, dmText, FB_PAGE_ACCESS_TOKEN);

                await sendTelegramAlert(
                  `🎁 <b>Khách Xin Tài Liệu</b>\n\n` +
                  `👤 <b>Khách:</b> ${senderName}\n` +
                  `💬 <b>Comment:</b> "${messageText}"\n` +
                  `✅ <i>Bot đã tự động gửi quà vào DM</i>`
                );
              } else {
                await replyCommentPublic(commentId, `Cảm ơn ${senderName} đã theo dõi chia sẻ của anh Việt nhé! Chúc bạn ngày mới nhiều năng lượng.`, FB_PAGE_ACCESS_TOKEN);
              }
            }
          }
        }
      }
    }
    return res.status(200).json({ status: 'EVENT_RECEIVED' });
  }

  // ─── 3. SEPAY PAYMENT WEBHOOK PROCESSING ────────────────────────────────────
  try {
    console.log('[SePay Webhook Received]:', JSON.stringify(body));

    const transferType = (body.transferType || body.transfer_type || 'in').toLowerCase();
    const amount = parseFloat(body.transferAmount || body.amount_in || body.amountIn || '0');
    const content = (body.content || body.transaction_content || body.description || '').toString();
    const transactionId = (body.id || body.referenceCode || body.reference_number || '').toString();

    if (transferType === 'out') {
      console.log('[SePay Webhook] Ignored money-out transaction');
      return res.status(200).json({ success: true, message: 'Ignored money-out' });
    }

    if (amount !== COURSE_AMOUNT) {
      console.log(`[SePay Webhook] Amount mismatch: received ${amount}, expected ${COURSE_AMOUNT}`);
      return res.status(200).json({ success: true, message: 'Amount mismatch ignored' });
    }

    const phoneMatch = content.match(/(0[35789]\d{8})/);
    if (!phoneMatch) {
      console.log(`[SePay Webhook] No valid Vietnamese phone number found in content: "${content}"`);
      return res.status(200).json({ success: true, message: 'No phone number match' });
    }

    const phone = phoneMatch[1];
    console.log(`[SePay Webhook] Extracted phone: ${phone} for transaction: ${transactionId}`);

    let updateData: any = {};
    if (GOOGLE_SCRIPT_URL) {
      try {
        const payload = {
          action: "update_status",
          phone: phone,
          status: "Đã thanh toán"
        };
        const scriptRes = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        updateData = await scriptRes.json();
      } catch (err) {
        console.error('[SePay Webhook] Failed to update Google Sheet:', err);
      }
    }

    if (MAKE_WEBHOOK_URL) {
      try {
        const makePayload = {
          transactionId: transactionId,
          amount: amount,
          content: content,
          phone: phone,
          name: updateData.name || "Học viên",
          email: updateData.email || "",
          status: "Đã thanh toán",
          timestamp: new Date().toISOString()
        };
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(makePayload)
        });
      } catch (err) {
        console.error('[SePay Webhook] Failed to trigger Make.com webhook:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Transaction processed successfully',
      phone: phone
    });

  } catch (error: any) {
    console.error('[SePay Webhook Internal Error]:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
