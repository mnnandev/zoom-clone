import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define the routes to be protected
const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/recordings',
    '/personal-room',  // Fixed typo here
    '/meeting(.*)',     // Allow dynamic meeting routes
])

export default clerkMiddleware(async (auth, req) => {
    if (protectedRoutes(req)) await auth.protect()
  })

export const config = {
  matcher: [
    // Skip Next.js internals and static files, but include the ones with search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
