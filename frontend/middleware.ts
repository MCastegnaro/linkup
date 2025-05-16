import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("token")?.value || request.headers.get("authorization");

  const isAuthenticated = !!token;

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = ["/", "/login", "/register"].includes(pathname);

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/tasks", "/login", "/register"],
};
