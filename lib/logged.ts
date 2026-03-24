import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const isLogged = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY!) as {
      id: string;
      role: string;
    };
    return decoded;
  } catch {
    return null;
  }
};