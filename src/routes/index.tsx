import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/editor" });
  },
  head: () => ({
    meta: [
      { title: "AutoRevive HR Letter Studio | Internship & Offer Letters" },
      {
        name: "description",
        content:
          "Fill in candidate details, add your signature, and download a branded AutoRevive A4 letter as a sharp PDF. Nothing is stored.",
      },
      { property: "og:title", content: "AutoRevive HR Letter Studio" },
      {
        property: "og:description",
        content: "Branded AutoRevive HR letters with live A4 preview and instant PDF export.",
      },
    ],
  }),
  component: () => null,
});
