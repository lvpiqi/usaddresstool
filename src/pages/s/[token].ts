import type { APIRoute } from "astro";
import { createShareRedirectResponse } from "../../utils/share-redirect";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  return createShareRedirectResponse(params.token || "", request.url);
};
