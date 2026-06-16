export function isPrivateIp(ip: string): boolean {
  const cleaned = ip.replace(/^\[|\]$/g, "");

  if (cleaned === "::1" || cleaned === "0:0:0:0:0:0:0:1") return true;
  if (cleaned === "0.0.0.0") return true;

  const v4Match = cleaned.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4Match) {
    const [, a, b] = v4Match.map(Number);
    if (a === 127) return true;
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    return false;
  }

  const lower = cleaned.toLowerCase();
  if (lower.startsWith("fe80:")) return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;

  return false;
}
