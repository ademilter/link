"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { User } from "next-auth";

const linkCreateSchema = z.object({
  url: z.string().url(),
});

type FormData = z.infer<typeof linkCreateSchema>;

export default function FormNew({ user }: { user: User }) {
  const router = useRouter();

  // const { data, error } = useSWR("api/test", fetcher);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkCreateSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      await fetch("/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset();
      router.push(`/u/${user["username"]}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <input
            className="py-1 px-2 w-full border border-solid border-gray-300"
            type="url"
            {...register("url")}
          />
          {errors?.url && (
            <p className="px-1 text-xs text-red-600">{errors.url.message}</p>
          )}
        </div>

        <div>
          <button
            disabled={isLoading}
            className="py-1 px-2 border border-solid border-gray-300"
          >
            save
          </button>
        </div>
      </div>
    </form>
  );
}
