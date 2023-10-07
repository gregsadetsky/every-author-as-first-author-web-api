import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const queryStringKeys = Object.keys(req.query);

  if (!queryStringKeys || !queryStringKeys.length) {
    res.status(400);
    res.json({ message: "Missing query string" });
    return;
  }

  const names = queryStringKeys[0]
    .split(",")
    .map((name) => decodeURIComponent(name).trim());

  res.status(200);
  res.setHeader("Content-Type", "image/svg+xml");
  res.write(
    `
    <svg xmlns="http://www.w3.org/2000/svg">
     <title>${names.join(", ")}</title>
      ${names.map((name) => `<text x="0" y="15">${name}</text>`).join("")}
    </svg>
  `.trim(),
  );
  res.end();
}
