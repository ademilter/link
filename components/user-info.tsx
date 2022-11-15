"use client";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import LoginButton from "@/components/login-button";

export default function UserInfo({ user }: { user: User }) {
  return (
    <div>
      {user ? (
        <div className="flex items-center">
          <img width={40} src={user.image} alt={user.name} />
          <h1>{user.name}</h1>
          <button
            className="cursor-pointer"
            onClick={() => {
              return signOut({
                callbackUrl: `${window.location.origin}/login`,
              });
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
