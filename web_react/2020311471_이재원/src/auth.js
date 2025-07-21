import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: {
                    label: "name",
                    type: "text",
                },
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const user = await db.user.findUnique({
                    where: {name: credentials.name},
                });
        
                if (!user) {
                    throw new Error("No user found with the given name");
                }
        
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
        
                if (!isValid) {
                    throw new Error("Invalid password");
                }
        
                return {id: user.id, name: user.name};
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
    },
};

export const {auth, handlers, signIn, signOut} =
NextAuth(authOptions);