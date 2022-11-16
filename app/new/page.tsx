import { getCurrentUser } from "@/lib/session";
import FormNew from "@/components/form-new";
// import useSWR from "swr";
// const fetcher = (url) => fetch(url).then((res) => res.json());

export default async function New() {
  const user = await getCurrentUser();

  return (
    <div>
      <FormNew user={user} />
    </div>
  );
}
