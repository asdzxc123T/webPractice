"use server";
import db from "./db";
import { auth } from "./auth";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

export const fetchNotes = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const notes = await db.note.findMany({
      where: { userId: parseInt(session.user.id) },
      include: {
        contents: true,
      },
    });
    return notes.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.contents.map((c) => c.value).join("\n"),
      pinned: note.pinned,
    }));
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    throw new Error("Failed to fetch notes.");
  }
};

export const fetchProfile = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const currentUser = await db.user.findUnique({
      where: { id: parseInt(session.user.id, 10) },
    });
    return {
      profile: currentUser.profile,
      theme: currentUser.theme,
      font: currentUser.font,
    };
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    throw new Error("Failed to fetch profile.");
  }
};

export const addNote = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  const newNoteId = await db.note.count({
    where: { userId: parseInt(session.user.id) },
  });
  try {
    const newNote = await db.note.create({
      data: {
        title: `Untitled ${newNoteId + 1}`,
        user: { connect: { id: parseInt(session.user.id) } },
      },
    });
    const newContent = await db.content.create({
      data: {
        id: newNote.id,
        type: "p",
        value: "Start writing your note here...",
        noteId: newNote.id,
      },
    });
    return {
      id: newNote.id,
      title: newNote.title,
      content: newContent.value,
    };
  } catch (err) {
    console.error("Failed to add note:", err);
    throw new Error("Failed to add note.");
  }
};

export const updateNote = async (noteId, updateData) => {
  try {
    if (updateData.title) {
      await db.note.update({
        where: { id: noteId },
        data: { title: updateData.title },
      });
    }
    if (updateData.content) {
      await db.content.updateMany({
        where: { noteId },
        data: { value: updateData.content },
      });
    }
    return { id: noteId, ...updateData };
  } catch (err) {
    console.error("Failed to update note:", err);
    throw new Error("Failed to update note.");
  }
};

export const register = async (formData) => {
  const hashedPassword = await bcrypt.hash(formData.get("password"), 10);
  const newUser = {
    name: formData.get("name"),
    password: hashedPassword,
  };
  try {
    const createdNewUser = await db.user.create({
      data: newUser,
    });
    return createdNewUser;
  } catch (err) {
    throw new Error("Failed to create user");
  }
};

export const deleteNote = async (noteId) => {
  try {
    await db.content.deleteMany({
      where: { noteId },
    });
    await db.note.delete({
      where: { id: parseInt(noteId, 10) },
    });
  } catch (error) {
    console.error("Error Delete note:", error);
    throw new Error("Failed to delete note.");
  }
};

export const onUpload = async (formData) => {
  const file = formData.get("data");
  const userId = formData.get("userId");
  const searchPath = formData.get("path") || "/";
  const content = await file.arrayBuffer();
  const filePath = path.join(process.cwd(), "public", searchPath, file.name);
  const profilePath = `/${file.name}`;
  await fs.writeFile(filePath, Buffer.from(content));
  try {
    const updatedUser = await db.user.update({
      where: { id: parseInt(userId, 10) },
      data: { profile: profilePath },
    });
    return { id: updatedUser.id, profile: updatedUser.profile };
  } catch (error) {
    console.error("Failed to update profile:", err);
    throw new Error("Failed to update profile.");
  }
}

export const pin = async (noteId) => {
  try {
    await db.note.update({
      where: { id: parseInt(noteId, 10) },
      data: { pinned: true },
    });
    return { id: noteId, pinned: true };
  } catch (err) {
    console.error("Failed to pin:", err);
    throw new Error("Failed to pin.");
  }
};

export const unpin = async (noteId) => {
  try {
    await db.note.update({
      where: { id: noteId },
      data: { pinned: false },
    });
    return { id: noteId, pinned: false };
  } catch (err) {
    console.error("Failed to unpin:", err);
    throw new Error("Failed to unpin.");
  }
};

export const updateUserPreferences = async (preferences) => {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  try {
      const updatedUser = await db.user.update({
          where: { id: parseInt(session.user.id, 10) },
          data: preferences,
      });
      return updatedUser;
  } catch (err) {
      console.error("Failed to update preferences:", err);
      throw new Error("Failed to update preferences.");
  }
};

export const fetchComments = async (noteId) => {
  try {
    const comments = await db.comment.findMany({
      where: { noteId },
      orderBy: { createdAt: 'asc' },
    });
    return comments;
  } catch (err) {
    console.error("Failed to fetch comments:", err);
    throw new Error("Failed to fetch comments.");
  }
};

export const addComment = async (noteId, content) => {
  try {
    const newComment = await db.comment.create({
      data: { noteId, content },
    });
    return newComment;
  } catch (err) {
    console.error("Failed to add comment:", err);
    throw new Error("Failed to add comment.");
  }
};

export const deleteComment = async (commentId) => {
  try {
    await db.comment.delete({
      where: { id: commentId },
    });
  } catch (err) {
    console.error("Failed to delete comment:", err);
    throw new Error("Failed to delete comment.");
  }
};