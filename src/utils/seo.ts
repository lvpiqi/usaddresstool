export function toAbsoluteUrl(path: string, site?: URL | string) {
  if (!site) {
    return path;
  }

  return new URL(path, site).toString();
}
