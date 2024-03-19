import { NextResponse } from "next/server";

export default function middleware(req) {
  const loggedin = req.cookies.get("token");
  const role = req.cookies.get("role");
  const { pathname } = req.nextUrl;

  if (!loggedin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  if (role.value === "admin" && pathname === "/") {
    return NextResponse.redirect(new URL(`/message`, req.url));
  }

  if (role.value === "agent" && pathname === "/") {
    return NextResponse.redirect(new URL(`/message`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
