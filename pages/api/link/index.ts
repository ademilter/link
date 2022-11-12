import getMetaData, { Options } from "metadata-scraper";
import { NextApiRequest, NextApiResponse } from "next";
import normalizeUrl from "normalize-url";
import isUrlHttp from "is-url-http";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query as { url: string };

  if (!isUrlHttp(url)) {
    return res.status(400).json({ error: "url is not valid" });
  }

  const parsedUrl = normalizeUrl(url as string);

  const options: Options = {
    url: parsedUrl,
    maxRedirects: 2,
  };

  try {
    const data = await getMetaData(options);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};
