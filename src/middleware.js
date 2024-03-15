import { NextResponse } from "next/server";
export default function middleware(req) {
  let loggedin = req.cookies.get("token");
  const { pathname } = req.nextUrl;
  if (!loggedin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
