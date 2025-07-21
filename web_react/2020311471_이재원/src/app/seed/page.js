import db from "@/db";
import bcrypt from "bcryptjs";

export default async function SeedPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Access Denied</h1>
        <p>This page is not available in the production environment.</p>
      </div>
    );
  }

  try {
    await db.content.deleteMany();
    await db.comment.deleteMany();
    await db.note.deleteMany();
    await db.user.deleteMany();

    const hashedPassword = await bcrypt.hash("1234", 10);
    
    const newUser = await db.user.create({
      data: {
        id: parseInt(1, 10),
        name: "abc",
        password: hashedPassword,
      },
    });

    const newNote1 = await db.note.create({
      data: {
        id: parseInt(1, 10),
        title: "First Note",
        userId: newUser.id,
      },
    });
    const newNote2 = await db.note.create({
      data: {
        id: parseInt(2, 10),
        title: "Second Note",
        userId: newUser.id,
      },
    });

    const newContent = [
      {
        id: parseInt(1, 10),
        type: "p",
        value: "This is the first note.",
        noteId: newNote1.id,
      },
      {
        id: parseInt(2, 10),
        type: "p",
        value: "This is the second note.",
        noteId: newNote2.id,
      },
    ];

    await db.content.createMany({
      data: newContent,
    });

    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Database Seeded Successfully!</h1>
        <p>
          All existing users and todos have been deleted and new entries have
          been added.
        </p>
        <a href="/">Go to Home</a>
      </div>
    );
  } catch (error) {
    console.error("Seeding Error:", error);
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h1>Seeding Failed</h1>
        <p>There was an error seeding the database.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }
}

