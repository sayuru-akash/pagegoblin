import { PageFetchError } from "@/lib/fetcher";

export function mapFetchErrorToStatus(error: unknown): { status: number; message: string } {
  if (error instanceof PageFetchError) {
    switch (error.code) {
      case "INVALID_URL":
        return { status: 400, message: "That link has no scent. Give me a real website URL." };
      case "BLOCKED_PROTOCOL":
        return { status: 400, message: "I only crawl through normal http or https links." };
      case "BLOCKED_HOST":
      case "BLOCKED_PRIVATE_IP":
      case "DNS_PRIVATE_IP":
        return { status: 400, message: "That link points into a private cave. Give me a public page." };
      case "BLOCKED_CREDENTIALS":
        return { status: 400, message: "Take the username and password out of the link before you feed it to me." };
      case "DNS_LOOKUP_FAILED":
        return { status: 400, message: "I sniffed for that website and found nothing. Check the name." };
      case "FETCH_FAILED":
        return { status: 502, message: "I clawed at the page, but it would not let me in." };
      case "REDIRECT_LIMIT":
        return { status: 502, message: "That link sent me running in circles. It redirects too many times." };
      case "TIMEOUT":
        return { status: 504, message: "The page took so long that moss grew on my claws. Try again." };
      case "BODY_TOO_LARGE":
        return { status: 422, message: "That page is too huge for me to drag into the cave." };
      case "NON_HTML_CONTENT":
        return { status: 422, message: "That link is not a webpage I can chew through." };
    }
  }
  return { status: 500, message: "Something snapped in the cave. Throw the link at me again." };
}
