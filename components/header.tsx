import Container from "@/components/container";
import UserInfo from "@/components/user-info";
import { User } from "next-auth";
import Link from "next/link";

export default function Header({ user }: { user: User }) {
  return (
    <header>
      <Container>
        <div className="flex items-center py-6 border-b border-solid border-b-zinc-100 dark:border-b-zinc-800">
          <div className="grow">
            <UserInfo user={user} />
          </div>
          <Link href="/new">New</Link>
        </div>
      </Container>
    </header>
  );
}
