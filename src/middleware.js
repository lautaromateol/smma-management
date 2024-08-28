import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhook", '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth()

  if (userId && isPublicRoute(req)) {
    let path = "/create-agency"

    if (orgId) {
      path = `/agency/${orgId}`
    }

    const orgSelection = new URL(path, req.url)
    return NextResponse.redirect(orgSelection)
  }

  if (!userId && !isPublicRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url })
  }

  if (userId && !orgId && req.nextUrl.pathname !== "/create-agency") {
    const orgSelection = new URL("/create-agency", req.url)
    return NextResponse.redirect(orgSelection)
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
