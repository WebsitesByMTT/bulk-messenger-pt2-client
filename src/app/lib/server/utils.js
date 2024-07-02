"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";

export const getCookie = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return token;
};

export const getCurrentUser = async () => {
  const token = await getCookie();
  const user = jwt.decode(token);
  return user.name;
};

export default async function action() {
  revalidateTag("/agents");
}
