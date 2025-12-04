import { initBotId } from "botid/client/core"

// Define the paths that need bot protection.
// These are paths that are routed to by your app.
// These can be:
// - API endpoints (e.g., '/api/checkout')
// - Server actions invoked from a page (e.g., '/dashboard')
// - Dynamic routes (e.g., '/api/create/*')
// Wildcards can be used to expand multiple segments
// /team/*/activate will match
// /team/a/activate
// /team/a/b/activate
// /team/a/b/c/activate
// ...
// Wildcards can also be used at the end for dynamic routes
// /api/user/*
initBotId({
  protect: [
    {
      path: "/forgot-password",
      method: "POST",
    },
    {
      path: "/reset-password",
      method: "POST",
    },
    {
      path: "/sign-in",
      method: "POST",
    },
    {
      path: "/sign-up",
      method: "POST",
    },
    {
      path: "/admin/*",
      method: "POST",
    },
  ],
})
