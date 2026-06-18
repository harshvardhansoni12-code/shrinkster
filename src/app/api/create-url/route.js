import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      return Response.json(
        { error: "Please provide a valid URL" },
        { status: 400 }
      );
    }

    // Basic URL format validation
    try {
      new URL(url);
    } catch {
      return Response.json(
        { error: "Invalid URL format. Please include http:// or https://" },
        { status: 400 }
      );
    }

    // Check if this URL has already been shortened
    const urlFound = await prisma.url.findUnique({
      where: { url },
    });

    if (urlFound) {
      // URL already exists, return existing shortcode
      const origin = new URL(req.url).origin;
      return Response.json({
        shortUrl: `${origin}/api/${urlFound.shortcode}`,
        shortcode: urlFound.shortcode,
        isExisting: true,
      });
    }

    // Create new short URL
    const shortcode = nanoid(6);
    const urlCreated = await prisma.url.create({
      data: { url, shortcode },
    });

    if (!urlCreated) {
      return Response.json(
        { error: "Failed to create short URL" },
        { status: 500 }
      );
    }

    const origin = new URL(req.url).origin;
    return Response.json(
      {
        shortUrl: `${origin}/api/${shortcode}`,
        shortcode,
        isExisting: false,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error creating short URL:", e);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
