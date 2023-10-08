import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./app/(auth)/login/action";
import logger from "./src/logging";

async function authenticateUser(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Token not found in cookies");
  }

  const url = process.env.NEXT_PUBLIC_API_ENPOINT! + `user`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  logger.info(`API Request to ${url} - Status: ${response.status}`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export async function middleware(request: NextRequest) {
  try {
    await authenticateUser(request);
    return NextResponse.next();
  } catch (error) {
    logger.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
};
