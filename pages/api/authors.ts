import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  /*
    parse incoming request query param:
    /authors?Erik%20D.%20Demaine+Martin%20L.%20Demaine
    split into both names (separated by +) and urldecode the names
  */
  const queryString = req?.url?.match(/^\/authors\?(.+)$/)?.[1];
  if (!queryString) {
    res.status(400);
    res.json({ message: "Missing query string" });
    return;
  }
  const names = queryString.split("+").map((name) => decodeURIComponent(name));

  res.status(200);
  res.setHeader("Content-Type", "image/svg+xml");
  res.write(
    `
    <svg xmlns="http://www.w3.org/2000/svg">
     <title>${names.join(", ")}</title>
      ${names
        .map((name) => `<text x="0" y="15" class="small">${name}</text>`)
        .join("")}
    </svg>
  `.trim(),
  );
  res.end();
}
