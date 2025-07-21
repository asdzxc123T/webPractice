import { auth } from "@/auth";
import NotesPage from "./home/page";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth(); 
  if (!session) {
    return redirect("/login");
  }

  return <NotesPage user={session.user} />;
}