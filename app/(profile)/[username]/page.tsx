import React from "react";
import { Link, User } from "@prisma/client";
import { db } from "@/lib/db";
import { DateTime } from "luxon";

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

  console.log("user:", user);

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

  return (
    <div>
      <div className="border border-solid p-4 rounded-lg">
        <h1>{user.username}</h1>
        <p>{user.bio}</p>
        <p>{user.blog}</p>
        <p>{user.location}</p>
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
