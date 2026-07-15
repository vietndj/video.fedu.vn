import type { VercelRequest, VercelResponse } from '@vercel/node';

function viTimestamp() {
  try {
    return new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  } catch {
    return new Date().toISOString();
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
    const { name = "", phone = "", email = "", url = "" } = req.body || {};
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3s4V-cItvUcM3g-oZy0mAWsxGXr9UhLhz_qPgXWZgFNTT9KgKZxu391m-aRv8rz8U/exec";

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL is not set. Cannot save to Google Sheets.");
      return res.status(200).json({ success: true, rowIndex: -1 });
    }

    const payload = {
      action: "append",
      values: [viTimestamp(), name, `'${phone}`, email, url, "chưa thanh toán"]
    };

    // We fetch Google Apps Script
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Google Script failed with status ${response.status}`);
      } else {
        const text = await response.text();
        console.log("Google Script response:", text.substring(0, 100));
      }
    } catch (scriptErr) {
      console.error("Failed to append to Google Sheet:", scriptErr);
    }

    return res.status(200).json({ success: true, rowIndex: -1 });
  } catch (err: any) {
    console.error("Error registering lead:", err);
    return res.status(500).json({ error: "Failed to register lead", details: err.message });
  }
}
