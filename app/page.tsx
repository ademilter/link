import { getCurrentUser } from "@/lib/session";
import UserInfo from "@/components/user-info";

export default async function Index() {
  const user = await getCurrentUser();

  // if (!user) {
  //   return notFound()
  // }

  return (
    <>
      <UserInfo user={user} />

      <hr className="my-6" />

      <h1>index</h1>
    </>
  );
}
