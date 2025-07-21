import db from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, password } = await req.json();

  if (!name || !password) {
    return new Response("Missing fields", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: { name, password: hashedPassword },
    });
    return new Response("User created successfully", { status: 201 });
  } catch (err) {
    return new Response("Failed to create user", { status: 500 });
  }
}