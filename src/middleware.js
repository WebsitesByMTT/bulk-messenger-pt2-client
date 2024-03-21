import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req) {
  const loggedin = req.cookies.get("token");
  const { pathname } = req.nextUrl;
//
  if (!loggedin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL(`/message`, req.url));
  }
  if (loggedin) {
    const decodeToken = jwt.decode(loggedin.value);
    const role = decodeToken ? decodeToken.role : null;
    if (role && role === "admin") {
      if (
        pathname === "/agents" ||
        pathname === "/message" ||
        pathname === "/create"
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/message", req.url));
    }
    if (role && role === "agent") {
      if (pathname === "/message" || pathname === "/newmessage") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/message", req.url));
    }
  }
  // For any other cases return
  return NextResponse.next();
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };

