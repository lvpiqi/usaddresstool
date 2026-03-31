import { defineMiddleware } from "astro/middleware";

const noindexQueryParams = ["seed", "region"];

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (context.request.method !== "GET") {
    return response;
  }

  const url = new URL(context.request.url);
  const shouldNoindexQueryState = noindexQueryParams.some((param) =>
    Boolean(url.searchParams.get(param)?.trim())
  );

  if (!shouldNoindexQueryState) {
    return response;
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  headers.set("Cache-Control", "private, no-store, max-age=0");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
});
