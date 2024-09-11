import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/api/webhook", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/api/twitter-auth",
  "/api/meta-auth",
  "/api/linkedin-auth"
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();

  // Redirige al usuario autenticado que intenta acceder a una ruta pública a la ruta específica.
  if (userId && isPublicRoute(req)) {
    let path = "/create-agency";

    if (orgId) {
      path = `/agency/${orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Si el usuario no está autenticado y la ruta no es pública, redirige al inicio de sesión.
  if (!userId && !isPublicRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // Si el usuario está autenticado pero no tiene orgId y no está en "/create-agency", redirige a "/create-agency".
  if (userId && !orgId && req.nextUrl.pathname !== "/create-agency") {
    const orgSelection = new URL("/create-agency", req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Continuar con la respuesta sin cambios si no hay redirecciones aplicables.
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
