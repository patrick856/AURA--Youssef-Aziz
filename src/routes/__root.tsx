import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SelectionProvider } from "../context/selection";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.28em] opacity-60">404</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl">Not here.</h1>
        <p className="mt-4 text-sm opacity-70">
          The page you were looking for isn't in this room.
        </p>
        <div className="mt-8">
          <Link to="/" className="link-quiet text-sm uppercase tracking-[0.22em]">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something went quiet.</h1>
        <p className="mt-3 text-sm opacity-70">Please try again in a moment.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm uppercase tracking-[0.22em]">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="link-quiet border-b-0"
          >
            Try again
          </button>
          <a href="/" className="link-quiet border-b-0">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AURA — Handcrafted home decor" },
      {
        name: "description",
        content:
          "Handcrafted candles, vases and clocks. Made by hand, one small piece at a time.",
      },
      { name: "author", content: "AURA" },
      { property: "og:title", content: "AURA — Handcrafted home decor" },
      {
        property: "og:description",
        content:
          "Handcrafted candles, vases and clocks. Made by hand, one small piece at a time.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AURA" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Nunito+Sans:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SelectionProvider>
        <Outlet />
      </SelectionProvider>
    </QueryClientProvider>
  );
}
