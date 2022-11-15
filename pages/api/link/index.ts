import getMetaData, { Options } from "metadata-scraper";
import { NextApiRequest, NextApiResponse } from "next";
import normalizeUrl from "normalize-url";
import isUrlHttp from "is-url-http";
import { getSession } from "next-auth/react";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { withAuthentication } from "@/lib/api-middlewares/with-authentication";
import { db } from "@/lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    return res.status(200).json({ message: "GET" });
  }

  if (req.method === "POST") {
    try {
      const url = req.body.url;

      if (!isUrlHttp(url)) {
        return res.status(400).json({ error: "url is not valid" });
      }

      const parsedUrl = normalizeUrl(url);

      const options: Options = {
        url: parsedUrl,
        maxRedirects: 1,
      };

      const data = await getMetaData(options);

      const link = await db.link.create({
        data: {
          url: parsedUrl,
          title: data.title,
          description: data.description,
          image: data.image,
          icon: data.icon,
          data,
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      });

      return res.status(200).json(link);
    } catch (error) {
      res.status(400).json({ error: "something went wrong" });
    }
  }
}

export default withMethods(["GET", "POST"], withAuthentication(handler));
