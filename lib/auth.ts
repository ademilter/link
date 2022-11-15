import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = dbUser.username;
      }

      return session;
    },
    async jwt({ token, user, profile, isNewUser }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (isNewUser) {
        await db.user.update({
          where: { email: token.email },
          data: {
            username: profile["login"],
            bio: profile["bio"],
            blog: profile["blog"],
            location: profile["location"],
          },
        });
      }

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
  },
};
