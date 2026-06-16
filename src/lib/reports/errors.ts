import { PageFetchError } from "@/lib/fetcher";

export function mapFetchErrorToStatus(error: unknown): { status: number; message: string } {
  if (error instanceof PageFetchError) {
    switch (error.code) {
      case "INVALID_URL":
      case "BLOCKED_PROTOCOL":
      case "BLOCKED_HOST":
      case "BLOCKED_PRIVATE_IP":
      case "BLOCKED_CREDENTIALS":
      case "DNS_PRIVATE_IP":
        return { status: 400, message: error.message };
      case "DNS_LOOKUP_FAILED":
      case "FETCH_FAILED":
        return { status: 502, message: "Failed to reach the page." };
      case "REDIRECT_LIMIT":
        return { status: 502, message: "Page redirected too many times." };
      case "TIMEOUT":
        return { status: 504, message: "Page took too long to respond." };
      case "BODY_TOO_LARGE":
      case "NON_HTML_CONTENT":
        return { status: 422, message: error.message };
    }
  }
  return { status: 500, message: "An unexpected error occurred." };
}
