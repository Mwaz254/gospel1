import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  email: string;
  firstName: string;
  source?: string;
}

const POSTMARK_URL = "https://api.postmarkapp.com/email";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, firstName, source } = await req.json() as RequestBody;

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({ error: "Email and first name are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const postmarkToken = Deno.env.get("POSTMARK_SERVER_TOKEN");
    if (!postmarkToken) {
      return new Response(
        JSON.stringify({ error: "Email service is not configured." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const senderEmail = Deno.env.get("POSTMARK_SENDER_EMAIL") || "hello@inhimdaily.org";
    const senderName = Deno.env.get("POSTMARK_SENDER_NAME") || "In Him Daily";
    const siteUrl = Deno.env.get("SITE_URL") || "https://inhimdaily.com";
    const sampleLink = `${siteUrl}/sample-content`;

    const htmlBody = buildEmailHtml(firstName, sampleLink);
    const textBody = buildEmailText(firstName, sampleLink);

    const postmarkResponse = await fetch(POSTMARK_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": postmarkToken,
      },
      body: JSON.stringify({
        From: `${senderName} <${senderEmail}>`,
        To: email,
        Subject: "Your Free 7-Day Sample — In Him Daily",
        HtmlBody: htmlBody,
        TextBody: textBody,
        MessageStream: "outbound",
        Tag: source || "free_sample",
        TrackOpens: true,
      }),
    });

    if (!postmarkResponse.ok) {
      const errorText = await postmarkResponse.text();
      console.error("Postmark error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email. Please try again later." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Welcome email sent." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(firstName: string, sampleLink: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your Free 7-Day Sample — In Him Daily</title>
</head>
<body style="margin:0;padding:0;background:#0E2035;font-family:Georgia,'Times New Roman',serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0E2035;">
<tr><td align="center" style="padding:40px 16px;">

<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<tr><td align="center" style="padding:0 0 24px 0;">
<p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9983A;margin:0 0 8px 0;">In Him Daily</p>
<h1 style="font-family:Georgia,serif;font-size:28px;color:#FAF8F3;margin:0 0 8px 0;">Your Free 7-Day Journey</h1>
<p style="font-size:15px;color:rgba(250,248,243,0.6);margin:0;">Hidden with Christ in God</p>
</td></tr>

<tr><td style="padding:0 0 24px 0;">
<div style="background:rgba(201,152,58,0.08);border:1px solid rgba(201,152,58,0.25);border-radius:16px;padding:32px;text-align:center;">
<p style="font-size:17px;color:#FAF8F3;margin:0 0 16px 0;line-height:1.6;">Dear ${escapeHtml(firstName)},</p>
<p style="font-size:15px;color:rgba(250,248,243,0.65);margin:0 0 24px 0;line-height:1.7;">Thank you for requesting your free 7-day sample of In Him Daily. Your complete sample — seven days of Scripture, reflection, and prayer — is ready for you to read right now.</p>
<a href="${escapeHtml(sampleLink)}" style="display:inline-block;background:linear-gradient(110deg,#D4AF37,#E4B86A);color:#05070D;font-weight:700;font-size:15px;text-decoration:none;padding:16px 40px;border-radius:9999px;">Read My Free Sample Now</a>
<p style="font-size:13px;color:rgba(250,248,243,0.45);margin:20px 0 0 0;line-height:1.6;">Or copy this link into your browser:<br/><span style="color:#C9983A;">${escapeHtml(sampleLink)}</span></p>
</div>
</td></tr>

<tr><td style="padding:0 0 24px 0;">
<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;">
<p style="font-size:15px;color:rgba(250,248,243,0.7);margin:0 0 16px 0;line-height:1.7;">Each day of your sample includes:</p>
<table cellpadding="0" cellspacing="0" style="width:100%;">
<tr><td style="padding:4px 0;color:#C9983A;font-size:14px;width:24px;vertical-align:top;">✦</td><td style="padding:4px 0;font-size:14px;color:rgba(250,248,243,0.65);line-height:1.6;">A Scripture passage focused on encountering Jesus</td></tr>
<tr><td style="padding:4px 0;color:#C9983A;font-size:14px;width:24px;vertical-align:top;">✦</td><td style="padding:4px 0;font-size:14px;color:rgba(250,248,243,0.65);line-height:1.6;">A devotional reflection written for your daily life</td></tr>
<tr><td style="padding:4px 0;color:#C9983A;font-size:14px;width:24px;vertical-align:top;">✦</td><td style="padding:4px 0;font-size:14px;color:rgba(250,248,243,0.65);line-height:1.6;">A prayer to guide your conversation with God</td></tr>
<tr><td style="padding:4px 0;color:#C9983A;font-size:14px;width:24px;vertical-align:top;">✦</td><td style="padding:4px 0;font-size:14px;color:rgba(250,248,243,0.65);line-height:1.6;">A reflection question to help you go deeper</td></tr>
</table>
</div>
</td></tr>

<tr><td align="center" style="padding:32px 0 16px 0;">
<div style="width:56px;height:2px;background:linear-gradient(90deg,transparent,#C9983A,transparent);margin:0 auto 24px auto;"></div>
<p style="font-family:Georgia,serif;font-size:18px;font-style:italic;color:rgba(250,248,243,0.8);margin:0 0 8px 0;line-height:1.6;">"For you died, and your life is now hidden with Christ in God."</p>
<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#C9983A;font-weight:600;margin:0;">Colossians 3:3</p>
</td></tr>

<tr><td align="center" style="padding:16px 0 40px 0;">
<a href="${escapeHtml(siteUrl)}/books" style="display:inline-block;border:1px solid rgba(212,175,55,0.4);color:#E4B86A;font-weight:600;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:9999px;">Explore the Full Books</a>
</td></tr>

<tr><td align="center" style="padding:0 0 32px 0;border-top:1px solid rgba(212,175,55,0.15);">
<p style="font-size:12px;color:rgba(250,248,243,0.4);margin:24px 0 0 0;line-height:1.6;">In Him Daily · Daily Christian Devotionals<br/>inhimdaily.com</p>
</td></tr>

</table>

</td></tr>
</table>
</body>
</html>`;
}

function buildEmailText(firstName: string, sampleLink: string): string {
  return `In Him Daily — Your Free 7-Day Journey

Dear ${firstName},

Thank you for requesting your free 7-day sample of In Him Daily. Your complete sample — seven days of Scripture, reflection, and prayer — is ready for you to read right now.

Read your free sample here:
${sampleLink}

Each day includes:
- A Scripture passage focused on encountering Jesus
- A devotional reflection written for your daily life
- A prayer to guide your conversation with God
- A reflection question to help you go deeper

"For you died, and your life is now hidden with Christ in God." — Colossians 3:3

Explore the full books at inhimdaily.com/books

In Him Daily · inhimdaily.com
`;
}
