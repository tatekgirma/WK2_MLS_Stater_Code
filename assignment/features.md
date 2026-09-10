# Features (MoSCoW)

This document lists the Must-have and Should-have features for the Reddit-like application. Each feature includes: User capability, Implementation complexity (Simple / Moderate / Complex), and Priority justification.

---

## Must (M)

- **User Accounts & Authentication**
  - User capability: Register, login, logout, reset password, and manage authentication methods (email verification, OAuth providers).
  - Implementation complexity: Moderate
  - Priority justification: Core to identity, personalization, access control, and moderation accountability.

- **Create / Read / Update / Delete (Posts)**
  - User capability: Submit text/link/media posts, edit and delete own posts, view posts with metadata (author, time, score).
  - Implementation complexity: Moderate
  - Priority justification: Fundamental content model and user expression mechanism.

- **Threaded Comments**
  - User capability: Reply to posts and other comments in nested threads, edit/delete own comments, collapse/expand threads.
  - Implementation complexity: Moderate
  - Priority justification: Primary conversational structure and community discussion vehicle.

- **Voting & Ranking (Upvote / Downvote)**
  - User capability: Upvote or downvote posts and comments; view sorted feeds (hot, new, top, controversial).
  - Implementation complexity: Moderate
  - Priority justification: Drives content discovery, surface quality signals, and community moderation by users.

- **Communities (Subreddits)**
  - User capability: Create and discover named communities, join/leave, set community description and rules, view community listings.
  - Implementation complexity: Moderate
  - Priority justification: Organizes content into interest groups and scopes moderation.

- **Moderation Tools & Reporting**
  - User capability: Report content/users; moderators can review a mod queue, remove content, ban or mute users, and record actions/appeals.
  - Implementation complexity: Complex
  - Priority justification: Essential for safety, trust, and scalable community management.

- **Search & Discovery**
  - User capability: Keyword search for posts, comments and communities; filter by community, sort, and time range.
  - Implementation complexity: Moderate
  - Priority justification: Users must find relevant content and communities to stay engaged.

- **Notifications**
  - User capability: Receive in-app and optional email notifications for replies, mentions, mod actions, and important community updates.
  - Implementation complexity: Moderate
  - Priority justification: Drives retention and keeps users informed about interactions.

- **Content Policy & Reporting Workflow**
  - User capability: Accessible content policy/terms; moderators/admins have structured takedown workflows, evidence logging, and support for legal hooks (DMCA, data requests).
  - Implementation complexity: Complex
  - Priority justification: Legal/compliance and community safety requirements; supports transparent moderation.

- **Responsive UI & Accessibility**
  - User capability: Mobile-first responsive interface, keyboard navigation, screen-reader compatibility, and ARIA attributes.
  - Implementation complexity: Moderate
  - Priority justification: Ensures accessibility and broad device reach for adoption.

---

## Should (S)

- **Rich Media Embeds**
  - User capability: Inline previews and embedding for images, video, audio, and link unfurls (oEmbed-like behavior).
  - Implementation complexity: Moderate
  - Priority justification: Matches modern content expectations and increases engagement.

- **User Profiles & Karma**
  - User capability: Public profile page, bio, avatar, post/comment karma and simple karma history.
  - Implementation complexity: Simple
  - Priority justification: Social identity and lightweight reputation system encourage constructive participation.

- **Saved / Bookmarking & History**
  - User capability: Save/bookmark posts for later, view reading history and mark posts read/unread.
  - Implementation complexity: Simple
  - Priority justification: Improves retention and personal content management.

- **Flair, Tags, and Post Types**
  - User capability: Add community and post-level flair, structured tags, and support for content types (text, link, poll).
  - Implementation complexity: Simple
  - Priority justification: Improves discoverability, moderation signals, and content clarity.

- **Private Messaging**
  - User capability: One-to-one messages between users with block/report controls and basic inbox management.
  - Implementation complexity: Moderate
  - Priority justification: Enables private conversations and user-to-user coordination.

- **Moderation Queue & Analytics**
  - User capability: Moderator dashboard with activity logs, moderation KPIs, and aggregate analytics for community health.
  - Implementation complexity: Moderate
  - Priority justification: Helps moderators scale, measure effectiveness, and spot trends.

- **Customizable Feeds & Subscriptions**
  - User capability: Subscribe to communities, follow users or tags, and customize home feed ordering or filters.
  - Implementation complexity: Moderate
  - Priority justification: Personalization increases user engagement and retention.

- **Cross-posting**
  - User capability: Share a post across multiple communities with attribution and optional community-specific copy.
  - Implementation complexity: Simple
  - Priority justification: Encourages content distribution and discovery across related communities.

---

_Saved by the project assistant._
