/* Screenshots of the Pulse research app, shared by the Experience entry
   (Duke software engineering internship) and the Projects entry. */
export const PULSE_MEDIA = [
  {
    type: "image",
    src: "/pulse/pulse-01-cover.jpg",
    alt: "Pulse for Research title graphic showing the app running on two iPhones alongside an Apple Watch",
    caption:
      "PULSE: For Research — the engagement layer over Duke's wearable health-data platform.",
  },
  {
    type: "image",
    src: "/pulse/pulse-02-home.jpg",
    alt: "Pulse home screen showing the PulsePet hedgehog, streak counter, goal progress bars, trophy case, and daily metric tiles",
    caption:
      "Home view — PulsePet health tracks the login streak, above goal progress and the day's HealthKit metrics.",
  },
  {
    type: "image",
    src: "/pulse/pulse-03-pet-states.jpg",
    alt: "Grid of pet artwork showing hedgehog, axolotl, and dog each in five health states from low to high",
    caption:
      "Five health tiers per pet — the sprite degrades as a streak lapses and recovers as it rebuilds.",
  },
  {
    type: "image",
    src: "/pulse/pulse-04-trophy-case.jpg",
    alt: "Pulse trophy case screen with locked badge tiles and a detail popup for a 7-day sleep goal badge",
    caption:
      "Trophy case — 34 badges spanning login streaks, fitness goals, and game wins.",
  },
  {
    type: "image",
    src: "/pulse/pulse-05-fitness-trends.jpg",
    alt: "Pulse fitness trends screen showing goal progress bars and a seven-day step count line chart against a goal line",
    caption:
      "Fitness view — goal progress plus 7- and 30-day step trends against the user's target.",
  },
  {
    type: "image",
    src: "/pulse/pulse-06-fitness-charts.jpg",
    alt: "Pulse fitness charts for active energy and resting heart rate over the past seven days",
    caption:
      "Active energy and resting heart rate, each charted against its own goal line.",
  },
  {
    type: "image",
    src: "/pulse/pulse-07-rec-classes.jpg",
    alt: "Pulse Duke Rec Classes screen with facility filters, a date picker, and class cards showing times and registration counts",
    caption:
      "Duke Rec classes — filterable by facility and date, with live registration counts and in-app sign-up.",
  },
  {
    type: "image",
    src: "/pulse/pulse-08-leaderboard.jpg",
    alt: "Pulse group leaderboard showing a three-person podium and ranked standings by daily step count",
    caption:
      "Group leaderboard — podium and full standings, ranked on daily step count.",
  },
  {
    type: "image",
    src: "/pulse/pulse-09-find-friends.jpg",
    alt: "Pulse find friends screen with a search field and add friend buttons beside each result",
    caption: "Friend search, with request approval and rejection.",
  },
  {
    type: "image",
    src: "/pulse/pulse-10-photo-feed.jpg",
    alt: "Pulse photo feed showing friends' posts with timestamps, heart buttons, and report controls",
    caption:
      "Photo feed — friends-only posts that expire after 24 hours, with hearts and reporting.",
  },
  {
    type: "image",
    src: "/pulse/pulse-11-my-posts.jpg",
    alt: "Pulse My Posts screen showing the user's own photo posts with captions, heart counts, and delete buttons",
    caption: "My Posts — captions, heart counts, and user-side deletion.",
  },
  {
    type: "image",
    src: "/pulse/pulse-12-play-menu.jpg",
    alt: "Pulse Play screen with buttons to launch 2048 and Minesweeper",
    caption: "The games hub, one tap from the tab bar.",
  },
  {
    type: "image",
    src: "/pulse/pulse-13-2048.jpg",
    alt: "2048 running inside Pulse with sports equipment icons on the tiles and a score of 200",
    caption: "2048, rebuilt in SwiftUI with sports-equipment tiles.",
  },
  {
    type: "image",
    src: "/pulse/pulse-14-minesweeper.jpg",
    alt: "Minesweeper running inside Pulse on medium difficulty with a mine counter and timer",
    caption:
      "Minesweeper — easy, medium, and hard boards, each with its own badge.",
  },
];

export const PULSE_WORK = {
  kind: "app",
  label: "PULSE FOR RESEARCH — THE ENGAGEMENT LAYER",
  sections: [
    {
      heading: "THE PROBLEM",
      body: "Dr. Amanda Randles, principal investigator at the Duke Center for Computational and Digital Health Innovation, wants a shared database of health statistics that any researcher can draw from — so that no one has to recruit participants and clear IRB approval from scratch for every new study. The collection app already existed when I joined: users donate data from their wearables (Apple Watch, Fitbit, Oura Ring), and the app pulls it from Apple HealthKit and pushes it upstream. The failure mode was engagement. iOS terminates an app's background tasks once it sits unopened for roughly a week, so a participant who stops launching the app silently stops contributing data. Our team of four was tasked with building the layer that keeps them coming back, aimed squarely at Duke undergraduates.",
    },
    {
      heading: "FOUR PILLARS OF ENGAGEMENT",
      items: [
        {
          name: "Fitness metrics",
          body: "Customizable daily and weekly goals with 7- and 30-day trend charts for steps, walking distance, active energy, resting heart rate, and sleep — read live from Apple HealthKit and plotted against the user's own targets and prior weeks.",
        },
        {
          name: "Duke Recreation events",
          body: "Rec classes were scattered across several Duke sites and confusing to register for. We wired up the Duke fitness API so students can browse the full class calendar by facility and date, see live registration counts, and sign up without leaving the app.",
        },
        {
          name: "Social",
          body: "Group leaderboards ranked on daily step count so students can compete with friends or dorms, a friend request system, and photo posts that expire after 24 hours — closer to Locket or BeReal than a permanent feed.",
        },
        {
          name: "Games",
          body: "2048 and Minesweeper, rebuilt in-app as a low-friction reason to open it on a day with nothing else to check.",
        },
      ],
    },
    {
      heading: "THE RETENTION LOOP",
      body: "Two features tie the rest together. A Tamagotchi-style PulsePet gets healthier the more consistently you log in and visibly declines when a streak lapses, and a 34-badge trophy case rewards login streaks, hitting fitness goals for a run of days, and winning each game difficulty.",
    },
    {
      heading: "MY CONTRIBUTION",
      body: "I owned the fitness, events, and games features end to end — from HealthKit queries and data aggregation through to the SwiftUI charts, class calendar, and game interfaces. On the social side I built the frontend for the leaderboard and photo-posting views and wrote the backend work behind the leaderboards. I also presented progress and the final deliverable to the research team, Duke OIT stakeholders, and colleagues.",
    },
  ],
  stack: [
    "SwiftUI",
    "SwiftData",
    "FastAPI",
    "Python",
    "Apple HealthKit",
    "Duke Fitness API",
    "Git / GitLab",
  ],
  media: PULSE_MEDIA,
};
