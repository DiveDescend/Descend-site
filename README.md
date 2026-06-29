# Descend

**Discover, explore, and book scuba diving and water activities worldwide.**

Descend is a discovery and booking platform built for divers — from first-timers hunting for their Open Water course to experienced divers looking for the next great site. On the operator side, Descend gives dive shops, liveaboards, and guides a clean way to list their offerings and manage bookings.

---

## What's in this repo

This is the monorepo for the Descend web platform. It contains both customer-facing and operator-facing applications, along with shared packages used across them.

```
descend-site/
├── apps/
│   ├── consumer/        # Customer-facing web app (discovery, search, booking)
│   └── operator/        # Operator dashboard (listings, availability, bookings)
├── packages/
│   ├── ui/              # Shared design system and components
│   ├── types/           # Shared TypeScript types
│   └── api/             # Shared API client
└── README.md
```

> The web app is built mobile-first. Native iOS and Android applications are planned and will live in separate repositories.

---

## Product overview

**For divers**
- Discover dive sites by location, depth, experience level, and conditions
- Browse certified operators, liveaboards, and independent guides
- Book dives, courses, and water activities in one place
- Track logged dives and certifications *(planned)*

**For operators**
- List dive sites, trips, and activities
- Manage availability and pricing
- Accept and manage bookings
- Communicate with customers

---

## Status

🚧 Early development — not yet open for contributions.

---

## Company

Descend is built by [DiveDescend](https://github.com/DiveDescend).
