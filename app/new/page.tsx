"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const linkCreateSchema = z.object({
  url: z.string().url(),
});

type FormData = z.infer<typeof linkCreateSchema>;

export default function LoginPage() {
  // const { data, error } = useSWR("api/test", fetcher);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkCreateSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="url" {...register("url")} />
        {errors?.url && (
          <p className="px-1 text-xs text-red-600">{errors.url.message}</p>
        )}

        <button
          disabled={isLoading}
          className="bg-white text-black px-2 py-1 inline-flex"
        >
          save
        </button>
      </form>
    </div>
  );
}
