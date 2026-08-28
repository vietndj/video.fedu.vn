import type { VercelRequest, VercelResponse } from '@vercel/node';

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'vietmac_ai_meta_secret_2026';
const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN || '';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8964853536:AAHuRNm_hY-YQtveBD1HlmthN4I5xpVzM8U';
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
  // 1. Meta Webhook Verification Handshake (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('[Meta Webhook Verified Successfully]');
      return res.status(200).send(challenge);
    }
    return res.status(403).json({ error: 'Verification failed. Token mismatch.' });
  }

  // 2. Incoming Event Processing (POST)
  if (req.method === 'POST') {
    const body = req.body || {};
    console.log('[Meta Webhook Event Received]:', JSON.stringify(body));

    if (body.object === 'page') {
      for (const entry of body.entry || []) {
        // Handle Comments (Feed changes)
        for (const change of entry.changes || []) {
          if (change.field === 'feed' && change.value) {
            const val = change.value;
            const item = val.item; // 'comment' or 'status'
            const verb = val.verb; // 'add' or 'edit'

            if (item === 'comment' && verb === 'add') {
              const commentId = val.comment_id;
              const senderName = val.from?.name || 'Khách hàng';
              const messageText = (val.message || '').trim();
              const postId = val.post_id;

              console.log(`[New Comment from ${senderName}]: ${messageText}`);

              // Analyze intent
              const lower = messageText.toLowerCase();
              const isBuying = lower.includes('giá') || lower.includes('bao nhiêu') || lower.includes('học phí') || lower.includes('mua') || lower.includes('đăng ký') || lower.includes('lớp') || lower.includes('offline') || lower.includes('skool') || lower.includes('tư vấn');
              const isGift = lower.includes('xin') || lower.includes('file') || lower.includes('preset') || lower.includes('sfx') || lower.includes('gốc') || lower.includes('prompt') || lower.includes('mic') || lower.includes('gocmay') || lower.includes('1') || lower.includes('quan tam');

              if (PAGE_ACCESS_TOKEN) {
                // Like comment
                await likeComment(commentId, PAGE_ACCESS_TOKEN);

                if (isBuying) {
                  // Public reply
                  await replyCommentPublic(commentId, `Chào bạn ${senderName}, mình đã gửi thông tin chi tiết qua tin nhắn riêng cho bạn rồi nhé!`, PAGE_ACCESS_TOKEN);
                  
                  // Private DM
                  const dmText = `Chào bạn ${senderName}, mình là trợ lý của anh Việt.\n\nKhóa học "Tư Duy Quay & Edit Video Điện Thoại" đang có ưu đãi 599.000đ (học online xem lại trọn đời trên Skool + 5 bộ quà tặng).\n\n👉 Bạn xem chi tiết lộ trình và quà tặng tại đây nhé: https://video.fedu.vn\n\nBạn cần hỗ trợ gì thêm cứ nhắn ở đây, anh Việt và đội ngũ sẽ hỗ trợ bạn ngay nhé!`;
                  await sendPrivateDM(commentId, dmText, PAGE_ACCESS_TOKEN);

                  // Telegram alert for sales / VietMac
                  await sendTelegramAlert(
                    `⚡ <b>CƠ HỘI CHỐT ĐƠN MỚI</b> ⚡\n\n` +
                    `👤 <b>Khách:</b> ${senderName}\n` +
                    `💬 <b>Comment:</b> "${messageText}"\n` +
                    `📍 <b>Post ID:</b> ${postId}\n` +
                    `🤖 <i>Bot đã like, reply và gửi DM link video.fedu.vn</i>\n\n` +
                    `👉 <b>Sales hãy vào Messenger chăm sóc khách ngay!</b>`
                  );
                } else if (isGift) {
                  await replyCommentPublic(commentId, `Chào ${senderName}, mình đã gửi tài liệu qua tin nhắn cho bạn rồi nhé!`, PAGE_ACCESS_TOKEN);
                  const dmText = `Chào ${senderName}, tài liệu hướng dẫn và quà tặng làm video của anh Việt gửi bạn ở đây nhé: https://video.fedu.vn\n\nChúc bạn có những thước phim thật đẹp!`;
                  await sendPrivateDM(commentId, dmText, PAGE_ACCESS_TOKEN);

                  await sendTelegramAlert(
                    `🎁 <b>Khách Xin Tài Liệu</b>\n\n` +
                    `👤 <b>Khách:</b> ${senderName}\n` +
                    `💬 <b>Comment:</b> "${messageText}"\n` +
                    `✅ <i>Bot đã tự động gửi quà vào DM</i>`
                  );
                } else {
                  await replyCommentPublic(commentId, `Cảm ơn ${senderName} đã theo dõi chia sẻ của anh Việt nhé! Chúc bạn ngày mới nhiều năng lượng.`, PAGE_ACCESS_TOKEN);
                }
              } else {
                // If PAGE_ACCESS_TOKEN not yet configured, send alert to Telegram
                await sendTelegramAlert(
                  `📩 <b>Comment Mới Trên Page</b>\n\n` +
                  `👤 <b>Khách:</b> ${senderName}\n` +
                  `💬 <b>Nội dung:</b> "${messageText}"\n` +
                  `⚠️ <i>Chưa cấu hình PAGE_ACCESS_TOKEN để auto-reply.</i>`
                );
              }
            }
          }
        }
      }
      return res.status(200).json({ status: 'EVENT_RECEIVED' });
    }

    return res.status(404).send('Not Found');
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
