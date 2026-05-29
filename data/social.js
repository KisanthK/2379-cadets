// ============================================================
// SOCIAL MEDIA — Edit this file to update platform links and cards
// ============================================================
//
// platforms — the three social media cards on the page
//   iconType  — "ig" (Instagram), "fb" (Facebook), or "yt" (YouTube)
//               Determines the icon colour and logo shown on the card.
//   url       — full link to your account on that platform
//   name      — platform display name (e.g. "Instagram")
//   handle    — your account handle or page name shown under the title
//   desc      — one or two sentence description shown on the card
//   ctaLabel  — the call-to-action text at the bottom of the card
//
// whyCards — the six "What You'll See" feature tiles below the platforms
//   icon      — emoji displayed at the top of the tile
//   title     — short bold heading
//   desc      — one or two sentence description
//
// HOW TO UPDATE A PLATFORM LINK
// 1. Go to GitHub → data/social.js → click the pencil icon
// 2. Find the platform entry (ig / fb / yt)
// 3. Change the url, handle, desc, or ctaLabel as needed
// 4. Click Commit changes — site updates in ~30 seconds
//
// HOW TO ADD A WHY CARD
// 1. Add a new { icon, title, desc } entry to the whyCards array (before the last ])
// 2. Commit — done!
// ============================================================

window.socialData = {

    platforms: [
        {
            iconType: "ig",
            url: "https://www.instagram.com/2379rhlicadets?igsh=MWJ1NjBuanF6MW9jZA==",
            name: "Instagram",
            handle: "@2379rhlicadets",
            desc: "Photos, reels, and stories from training nights, weekend exercises, and cadet life.",
            ctaLabel: "Follow on Instagram"
        },
        {
            iconType: "fb",
            url: "https://www.facebook.com/share/1B5SufQfsN/?mibextid=wwXIfr",
            name: "Facebook",
            handle: "2379 RHLI Army Cadets",
            desc: "Event announcements, community updates, and parent communications.",
            ctaLabel: "Follow on Facebook"
        },
        {
            iconType: "yt",
            url: "https://www.youtube.com/@CommunityCultures-ArmyCadets",
            name: "YouTube",
            handle: "Community Cultures \u2013 Army Cadets",
            desc: "Video highlights, promotional content, and a window into the cadet training experience.",
            ctaLabel: "Watch on YouTube"
        }
    ],

    whyCards: [
        {
            icon: "\uD83D\uDCF8",
            title: "Training Photos",
            desc: "Action shots from weekly parade nights, field exercises, and skills training."
        },
        {
            icon: "\uD83C\uDF96\uFE0F",
            title: "Achievements",
            desc: "Promotions, awards, marksman badges, and cadet milestones celebrated publicly."
        },
        {
            icon: "\uD83D\uDCC5",
            title: "Event Updates",
            desc: "Upcoming activities, registration reminders, and schedule changes posted in real time."
        },
        {
            icon: "\uD83C\uDFD5\uFE0F",
            title: "Weekend Exercises",
            desc: "Highlights from field training exercises, biathlon, and outdoor adventure activities."
        },
        {
            icon: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66",
            title: "Parent Resources",
            desc: "Important information, supply lists, and communications shared through our pages."
        },
        {
            icon: "\uD83C\uDFAC",
            title: "Video Content",
            desc: "Recap videos, promotional shorts, and behind-the-scenes looks at cadet life."
        }
    ]

};
