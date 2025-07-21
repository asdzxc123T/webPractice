import { onUpload } from "@/actions";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  try {
    const updatedUser = await onUpload(formData);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}