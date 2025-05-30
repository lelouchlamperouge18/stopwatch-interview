This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Why setInterval is not good for implementing a time related function like stopwatch?

`setInterval` is not reliable for implementing precise time-based features due to:

- Event Loop Delay: JavaScript is single-threaded. When busy, setInterval execution is delayed.
- Browser Throttling: Inactive tabs or background apps may pause or slow timers.
- Time Drift: Small inaccuracies accumulate over time, making the stopwatch increasingly inaccurate.
- setInterval continues to run when switching tabs, but it doesn't always execute as consistently as it does when the tab is active.

## Our Solution: using `requestAnimationFrame`

Instead of `setInterval`, we use `requestAnimationFrame`, which:
- Syncs with the browser’s refresh rate
- Delivers more accurate and consistent timing
- Is paused automatically when the page is inactive (saving CPU)

To ensure consistent time tracking:
- We use `requestAnimationFrame` for ticking
- We store the accurate elapsed time in a `ref` (`secondsRef`)
- We use `useState` only to trigger UI re-rendering
