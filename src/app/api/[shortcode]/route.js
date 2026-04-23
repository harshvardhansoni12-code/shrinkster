import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { shortcode } = params;
  try {
    const urlFound = await prisma.url.findUnique({
      where: {
        shortcode,
      },
    });
    if (!urlFound) {
      return Response.json({ error: "url not found" }, { status: 405 });
    }
    return Response.redirect(urlFound.url);
  } catch (e) {
    return Response.json({ error: "something went wrong" }, { status: 500 });
  }
}
