import { Template } from "@/templates";
import { compile } from "@fileforge/react-print";
import { FileforgeClient } from "@fileforge/client";

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
