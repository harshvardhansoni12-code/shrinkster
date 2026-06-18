import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { shortcode } = await params;
  try {
    const urlFound = await prisma.url.findUnique({
      where: { shortcode },
    });

    if (!urlFound) {
      return Response.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }

    return Response.redirect(urlFound.url, 302);
  } catch (e) {
    console.error("Error resolving shortcode:", e);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
