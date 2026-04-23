import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    const shortcode = uuidv4();
    const urlFound = await prisma.url.findUnique({
      where: {
        url: body.url,
      },
    });
    if (!urlFound) {
      return Response.json({
        shortUrl: `https://mydomain.com/${urlFound.shortcode}`,
      });
    }
    const urlCreated = await prisma.url.create({
      data: {
        url: body.url,
        shortcode,
      },
    });
    if (!urlCreated) {
      return Response.json({ error: "url not created" }, { status: 405 });
    }
    return Response.json(
      { shortUrl: `https://mydomain.com/${shortcode}` },
      {
        status: 201,
      },
    );
  } catch (e) {
    return Response.json({ error: "something went worng" }, { status: 500 });
  }
}
