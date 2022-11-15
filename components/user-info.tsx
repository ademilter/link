"use client";

import { User } from "next-auth";
import LoginButton from "@/components/login-button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfo({ user }: { user: User }) {
  const router = useRouter();

  return (
    <div>
      {user ? (
        <div className="flex items-center">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button aria-label="Customise options">
                <img width={32} src={user.image} alt={user.name} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                className="bg-white text-zinc-900 rounded-md"
              >
                <DropdownMenu.Item
                  className="px-4 py-2"
                  onClick={() => {
                    router.push(`/u/${user["username"]}`);
                  }}
                >
                  {user.name}
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  className="px-4 py-2"
                  onClick={() => {
                    return signOut({
                      callbackUrl: `${window.location.origin}/`,
                    });
                  }}
                >
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
