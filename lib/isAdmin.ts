import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export const isAdmin = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return false;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as any;

    return decoded.role === "admin";
  } catch {
    return false;
  }
};