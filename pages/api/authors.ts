import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryStringKeys = Object.keys(req.query);

  if (!queryStringKeys || queryStringKeys.length !== 1) {
    res.status(400);
    res.write(
      "wrong query string. please check documentation on https://eaafa.greg.technology/",
    );
    res.end();
    return;
  }

  let names = queryStringKeys[0].split(",").map((name) => name.trim());

  // sanitize..?
  names = names.map((name) => name.replace(/[<>]/g, ""));

  res.status(200);
  res.setHeader("Content-Type", "image/svg+xml");
  res.write(
    `
    <svg xmlns="http://www.w3.org/2000/svg">
     <title>${names.join(", ")}</title>
      ${names.map((name) => `<text x="0" y="14">${name}</text>`).join("")}
    </svg>
  `.trim(),
  );
  res.end();
}
