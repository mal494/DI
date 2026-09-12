import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Analytics } from "~/components/analytics";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Divine Insight — A moment of clarity, drawn just for you",
      },
      {
        name: "description",
        content:
          "Divine Insight offers three-card tarot readings from the full 78-card deck — a moment of reflection and personal guidance, drawn just for you.",
      },
      { property: "og:title", content: "Divine Insight — A moment of clarity, drawn just for you" },
      {
        property: "og:description",
        content:
          "A three-card tarot reading from the full 78-card deck. Draw your cards — past, present, future — and receive a reading woven just for you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://9873ecde27a647bab406d2f117b45152.ctonew.app/" },
      { property: "og:image", content: "https://9873ecde27a647bab406d2f117b45152.ctonew.app/hero/hero-main.webp" },
      { property: "og:image:width", content: "1536" },
      { property: "og:image:height", content: "1024" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap",
      },
    ],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}