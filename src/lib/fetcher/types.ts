import type { PageSignals } from "../analysis/types";

export type FetchPageOptions = {
  timeoutMs?: number;
  maxBytes?: number;
  maxRedirects?: number;
  userAgent?: string;
};

export type FetchedPage = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  contentType: string | null;
  bytesRead: number;
  html: string;
};

export type ExtractedPageSignals = PageSignals & {
  fetchMeta: {
    requestedUrl: string;
    finalUrl: string;
    status: number;
    bytesRead: number;
    contentType: string | null;
  };
};

export type PageFetchErrorCode =
  | "INVALID_URL"
  | "BLOCKED_PROTOCOL"
  | "BLOCKED_HOST"
  | "BLOCKED_PRIVATE_IP"
  | "BLOCKED_CREDENTIALS"
  | "DNS_PRIVATE_IP"
  | "DNS_LOOKUP_FAILED"
  | "REDIRECT_LIMIT"
  | "TIMEOUT"
  | "BODY_TOO_LARGE"
  | "NON_HTML_CONTENT"
  | "FETCH_FAILED";

export class PageFetchError extends Error {
  readonly code: PageFetchErrorCode;

  constructor(code: PageFetchErrorCode, message: string) {
    super(message);
    this.name = "PageFetchError";
    this.code = code;
  }
}
