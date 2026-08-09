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

const POSTMARK_URL = "https://api.postmarkapp.com/email/withTemplate";

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

    const htmlBody = buildEmailHtml(firstName);
    const textBody = buildEmailText(firstName);

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
      JSON.stringify({ success: true, message: "Free sample email sent." }),
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

const devotionals = [
  {
    dayLabel: "Monday",
    title: "He Was There Before the Beginning",
    scripture: '"In the beginning was the Word, and the Word was with God, and the Word was God."',
    reference: "John 1:1",
    text: "Monday mornings carry a particular weight. The week stretches ahead with its demands, its uncertainties, its unfinished conversations from last week and its unplanned complications from this one. You open your eyes and the list is already running. But before the week. Before Monday. Before the calendar, the tasks, the plans — He was there. John 1:1 begins not at the nativity but before creation. In the beginning was the Word. Before anything was made, He was. And everything that was made was made through Him. This means that the week you are about to enter is not a territory He is unfamiliar with. He is not arriving with you on Monday morning, trying to catch up. He is already in Tuesday. Already in the meeting on Thursday. Already in the conversation on Friday that you do not yet know you are going to have. The Word became flesh and made His dwelling among us. He did not observe the human week from a distance. He entered it — the tiredness, the pressure, the relational complexity, the Sunday-night anxiety about Monday. He knows this week from the inside. Go into this week not as someone entering unknown territory. Go as someone following a guide who has already been there.",
    reflect: "What is the one thing about this week that feels most uncertain to you? What does it mean that Jesus is already there?",
    prayer: "Lord, You were in the beginning and You are in this week. Go before me. I follow You into Monday. Into all of it. Amen.",
  },
  {
    dayLabel: "Tuesday",
    title: "You Are Loved Before You Have Done Anything",
    scripture: '"Therefore, there is now no condemnation for those who are in Christ Jesus."',
    reference: "Romans 8:1",
    text: "Tuesday is the day when the gap between who you meant to be this week and who you are actually being becomes visible. Monday's good intentions have met Tuesday's reality. Maybe you said the wrong thing. Maybe you did not do the thing you promised yourself you would do. Maybe the gap is simply the familiar one — the distance between the person you are in Christ and the person you feel like in the bathroom mirror. There is now no condemnation for those who are in Christ Jesus. Not: there will eventually be no condemnation when you have improved sufficiently. Now. The present tense of a permanent legal reality. The court has spoken. The verdict is not guilty. Not because of your record — because of His. You are in Christ Jesus. You share His standing. The sentence was pronounced on Him. There is none left for you.",
    reflect: "Where do you most feel the weight of condemnation this week? What does Romans 8:1 say directly to that weight?",
    prayer: "Father, I receive it: no condemnation for me in Christ Jesus. The verdict is given. I live in that today. Amen.",
  },
  {
    dayLabel: "Wednesday",
    title: "The Branch Does Not Strain to Produce",
    scripture: '"I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing."',
    reference: "John 15:5",
    text: "By Wednesday, most people are running on the momentum they started with on Monday — and discovering that momentum has a half-life. The energy that felt so available on Monday morning is noticeably less available on Wednesday afternoon. The to-do list has grown while the capacity to address it has shrunk. Apart from me you can do nothing. This is either the most discouraging sentence Jesus ever said or the most liberating — depending on where you have been putting your effort. If you have been straining to produce results in your own strength, this sentence is an invitation to stop straining and start remaining. A branch does not strain to produce grapes. It does not generate them through willpower or longer working hours. It remains in the vine. The life of the vine flows through the branch that is connected. The grapes are the result of the connection, not the effort. The branch's job is to remain. The fruit is the vine's business.",
    reflect: "Where have you been straining to produce this week? What would it look like to stop straining and return to remaining in Jesus right now?",
    prayer: "Lord Jesus, I return to the abiding. I stop straining. I remain in You. Let Your life flow through me today. Amen.",
  },
  {
    dayLabel: "Thursday",
    title: "He Loved Them to the End",
    scripture: '"Having loved his own who were in the world, he loved them to the end."',
    reference: "John 13:1",
    text: "John writes that Jesus knew the hour had come for Him to leave this world and go to the Father. He knew what was coming — the betrayal was already at the table, the denial was hours away, the arrest was later that night. And John's summary of everything that happens from this moment until the cross is this: having loved his own who were in the world, he loved them to the end. Eis telos. To the uttermost. To the full completion of what love can do. He did not love them adequately. He did not love them to a reasonable degree and then assess whether the investment was worth continuing. He loved them to the end. Past the betrayal. Past the denial. Past the abandonment in the garden when they all fled. All the way. This is the love that is available to you on a Thursday — when the week has revealed whatever it has revealed about your limitations and your failures and your gaps. He already knew. He loved to the end anyway.",
    reflect: "Is there something about this week — a failure, a falling short — that makes you feel less loved by God? What does eis telos say to that specific thing?",
    prayer: "Jesus, You loved me to the end. Past everything this week has revealed. I receive that love today. Amen.",
  },
  {
    dayLabel: "Friday",
    title: "It Is Finished",
    scripture: '"When he had received the drink, Jesus said: it is finished. With that, he bowed his head and gave up his spirit."',
    reference: "John 19:30",
    text: "Friday is the day of completion — or the day of the unfinished list. Most weeks end with more items remaining than were there on Monday morning. The week did not deliver what you hoped. The project is not done. The conversation is still unresolved. The goal is still ahead. But on a different Friday, two thousand years ago, something was finished that no subsequent Monday needs to restart. Tetelestai. It is finished. The Greek word used to stamp a paid bill — nothing remaining, nothing outstanding, the account settled in full. The work the Father gave Jesus to do was done. The debt our sin produced was cancelled. The access to the Father that had been blocked since Eden was opened. Finished. Completely. Once. For all. You do not carry that into next week. It does not need to be done again.",
    reflect: "What is one thing you have been carrying this week as if it is unfinished that the cross has already settled? Name it. And leave it at the foot of Calvary.",
    prayer: "Lord Jesus, it is finished. The debt is paid. The access is open. I rest in what You completed. Amen.",
  },
  {
    dayLabel: "Saturday",
    title: "He Makes Me Lie Down",
    scripture: '"The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul."',
    reference: "Psalm 23:1-3",
    text: "The Lord makes me lie down. There is a compulsion to the rest that the Shepherd provides that is worth noticing. He does not suggest the green pasture. He does not recommend the quiet water. He makes. The Shepherd knows that the sheep, left to themselves, will graze past the point of health, driven by anxiety about whether there will be enough tomorrow. So the Shepherd makes the sheep lie down. Saturday is the day the Shepherd is making you lie down. Not because nothing is unfinished. Not because the week was perfectly completed. But because rest is not the reward for a completed list. Rest is the provision of the Shepherd for a sheep that has been walking since Monday. He leads me beside quiet waters. The quiet water is not the exciting part of the landscape. It is the necessary part. The place of stillness where the soul can be heard, where the Spirit can speak, where the depletion of the week can be acknowledged and brought to the one who restores.",
    reflect: "What has the week depleted in you — specifically? What would it look like to bring that specific depletion to the Shepherd today and let Him refresh it?",
    prayer: "Lord, You are my Shepherd. You make me lie down. You lead me beside quiet waters. Refresh my soul today. Amen.",
  },
  {
    dayLabel: "Sunday",
    title: "Come and See",
    scripture: '"The other disciple outran Peter and reached the tomb first. He saw and believed."',
    reference: "John 20:8",
    text: "The first Sunday changed everything. Mary Magdalene came to the tomb while it was still dark. She found the stone rolled away. She ran to tell Peter and John. They ran to the tomb. John arrived first, looked in, saw the linen cloths lying there — and believed. He saw and believed. Not the risen Jesus — not yet. The evidence of the empty tomb, the folded cloth, the composed and orderly departure of someone who was not panicked, not defeated, not finished. He saw and believed. That same evidence is available to you today. Not a physical tomb in Jerusalem — but two thousand years of the risen Christ being encountered by specific people in specific moments of need. The woman who was healed. The father whose son came home. The person in the prison cell who found peace. The family whose marriage was restored. The teenager who met Jesus on a Sunday morning and was never the same. Sunday is the day of the empty tomb. The stone is rolled away. The cloth is folded. He is not here in the way He was before. He has risen. And He is here in the way He always will be — encountered, known, alive. Come and see. The invitation is still open.",
    reflect: "When did you most recently have a 'he saw and believed' moment — an encounter with the risen Jesus that deepened your faith? What did it look like?",
    prayer: "Risen Jesus, You are alive. I come to the empty tomb today with open eyes and open hands. I see and I believe. Amen.",
  },
];

function buildEmailHtml(firstName: string): string {
  const devotionalCards = devotionals.map((d) => `
    <div style="background:#ffffff;border:1px solid #e9e3d4;border-radius:16px;padding:32px;margin-bottom:24px;">
      <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C9983A;font-weight:700;margin:0 0 4px 0;">Day ${devotionals.indexOf(d) + 1} · ${escapeHtml(d.dayLabel)}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#17324D;margin:0 0 16px 0;">${escapeHtml(d.title)}</h2>
      <div style="background:#FAF8F3;border-left:4px solid #C9983A;border-radius:8px;padding:16px 20px;margin:0 0 20px 0;">
        <p style="font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:#17324D;margin:0 0 8px 0;line-height:1.6;">${escapeHtml(d.scripture)}</p>
        <p style="font-size:13px;font-weight:600;color:#C9983A;margin:0;">${escapeHtml(d.reference)}</p>
      </div>
      <p style="font-size:15px;color:#3D3D3D;line-height:1.7;margin:0 0 20px 0;">${escapeHtml(d.text)}</p>
      <div style="background:#FAF8F3;border-radius:8px;padding:16px 20px;margin:0 0 12px 0;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#C9983A;font-weight:700;margin:0 0 6px 0;">Reflection</p>
        <p style="font-size:14px;font-style:italic;color:#17324D;margin:0;line-height:1.6;">${escapeHtml(d.reflect)}</p>
      </div>
      <div style="background:#FAF8F3;border-radius:8px;padding:16px 20px;margin:0;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#C9983A;font-weight:700;margin:0 0 6px 0;">Prayer</p>
        <p style="font-size:14px;font-style:italic;color:#17324D;margin:0;line-height:1.6;">${escapeHtml(d.prayer)}</p>
      </div>
    </div>`).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your Free 7-Day Sample — In Him Daily</title>
</head>
<body style="margin:0;padding:0;background:#0E2035;font-family:Georgia,'Times New Roman',serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0E2035;">
<tr><td align="center" style="padding:32px 16px;">

<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<tr><td align="center" style="padding:0 0 24px 0;">
<p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9983A;margin:0 0 8px 0;">In Him Daily</p>
<h1 style="font-family:Georgia,serif;font-size:28px;color:#FAF8F3;margin:0 0 8px 0;">Your Free 7-Day Journey</h1>
<p style="font-size:15px;color:rgba(250,248,243,0.6);margin:0;">Hidden with Christ in God</p>
</td></tr>

<tr><td style="padding:0 0 24px 0;">
<div style="background:rgba(201,152,58,0.08);border:1px solid rgba(201,152,58,0.25);border-radius:16px;padding:28px;text-align:center;">
<p style="font-size:17px;color:#FAF8F3;margin:0 0 12px 0;line-height:1.6;">Dear ${escapeHtml(firstName)},</p>
<p style="font-size:15px;color:rgba(250,248,243,0.65);margin:0;line-height:1.7;">Thank you for requesting your free 7-day sample of In Him Daily. Over the next seven days, we invite you to encounter Jesus through Scripture, reflection, and prayer — one day at a time.</p>
</div>
</td></tr>

<tr><td style="padding:0;">
${devotionalCards}
</td></tr>

<tr><td align="center" style="padding:32px 0 16px 0;">
<div style="width:56px;height:2px;background:linear-gradient(90deg,transparent,#C9983A,transparent);margin:0 auto 24px auto;"></div>
<p style="font-family:Georgia,serif;font-size:18px;font-style:italic;color:rgba(250,248,243,0.8);margin:0 0 8px 0;line-height:1.6;">"For you died, and your life is now hidden with Christ in God."</p>
<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#C9983A;font-weight:600;margin:0;">Colossians 3:3</p>
</td></tr>

<tr><td align="center" style="padding:16px 0 40px 0;">
<a href="https://inhimdaily.com/books" style="display:inline-block;background:linear-gradient(110deg,#D4AF37,#E4B86A);color:#05070D;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:9999px;">Explore the Full Books</a>
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

function buildEmailText(firstName: string): string {
  const devotionalSections = devotionals.map((d, i) => `
--- Day ${i + 1} · ${d.dayLabel} ---
${d.title}

${d.scripture}
${d.reference}

${d.text}

Reflection: ${d.reflect}

Prayer: ${d.prayer}
`).join("\n");

  return `In Him Daily — Your Free 7-Day Journey

Dear ${firstName},

Thank you for requesting your free 7-day sample of In Him Daily. Over the next seven days, we invite you to encounter Jesus through Scripture, reflection, and prayer — one day at a time.

${devotionalSections}

"For you died, and your life is now hidden with Christ in God." — Colossians 3:3

Explore the full books at inhimdaily.com/books

In Him Daily · inhimdaily.com
`;
}
