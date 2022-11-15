import React from "react";
import { Link, User } from "@prisma/client";
import { db } from "@/lib/db";
import { DateTime } from "luxon";
import { getCurrentUser } from "@/lib/session";

async function getData(username) {
  const links = await db.link.findMany({
    where: {
      user: {
        username,
      },
    },
  });
  const user = await db.user.findFirst({
    where: {
      username,
    },
  });

  return {
    links,
    user,
  };
}

interface UserPageProps {
  params: { username: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const data = await getData(params.username);
  const { links, user }: { links: Link[]; user: User } = data;

  const me = await getCurrentUser();

  return (
    <div>
      <div className="flex flex-col items-center">
        <img src={user.image} alt={user.name} className="w-40" />
        <h1 className="mt-4 text-xl font-semibold">{user.name}</h1>
        <p className="opacity-60">{user.username}</p>
        <p>{user.bio}</p>
        {user.blog && (
          <p>
            <a href={user.blog}>{user.blog}</a>
          </p>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {links.map((link) => (
          <div key={link.id}>
            <img src={link.icon} alt={link.url} width={16} height={16} />
            <a href={link.url}>{link.url}</a>
            <p>{link.description}</p>
            <p>{DateTime.fromJSDate(link.createdAt).toRelative()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
