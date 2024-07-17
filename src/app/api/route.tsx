import { Template } from "@/templates";
import { compile } from "@fileforge/react-print";
import { FileforgeClient } from "@fileforge/client";

export const dynamic = "force-dynamic";

const ff = new FileforgeClient({
  apiKey: process.env.NEXT_FILEFORGE_API_KEY,
});

export const GET = async () => {
  const html = await compile(<Template />);

  const { url } = await ff.pdf.generate(
    [
      new File([html], "index.html", {
        type: "text/html",
      }),
    ],
    {
      options: {
        host: true,
      },
    }
  );

  return Response.json({
    url,
  });
};

/**
export const GET = async () => {
  const html = await compile(<Template />);

  const file = await ff.pdf.generate(
    [
      new File([html], "index.html", {
        type: "text/html",
      }),
    ],
    {
      options: {
        host: false,
      },
    }
  );

  return new Response(file as unknown as BodyInit, {
    status: 200,
    headers: new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="file.pdf"`,
    }),
  });
};
*/
