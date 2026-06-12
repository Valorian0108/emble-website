import { Router } from "express";

const router = Router();

router.post("/apply", async (req, res) => {
  const { fullName, phone, nickname, age, height, weight, gender, program } = req.body;

  if (!fullName || !phone || !age || !gender || !program) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) {
    req.log.error("CALLMEBOT_API_KEY not set");
    res.status(500).json({ error: "WhatsApp service not configured" });
    return;
  }

  const message =
    `*NEW APPLICATION — EMBLE CREATIVE ACADEMY*\n\n` +
    `*Full Name:*        ${fullName}\n` +
    `*Phone Number:*     ${phone}\n` +
    `*Nickname:*         ${nickname || "—"}\n` +
    `*Age:*              ${age}\n` +
    `*Height:*           ${height || "—"}\n` +
    `*Weight:*           ${weight || "—"}\n` +
    `*Gender:*           ${gender}\n` +
    `*Program Interest:* ${program}`;

  const encoded = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=2349165785355&text=${encoded}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    if (!response.ok) {
      req.log.error({ status: response.status, body: text }, "CallMeBot error");
      res.status(502).json({ error: "Failed to send WhatsApp message" });
      return;
    }

    req.log.info({ applicant: fullName, program }, "Application submitted via WhatsApp");
    res.status(200).json({ success: true });
  } catch (err) {
    req.log.error({ err }, "CallMeBot fetch failed");
    res.status(502).json({ error: "Failed to send WhatsApp message" });
  }
});

export default router;
