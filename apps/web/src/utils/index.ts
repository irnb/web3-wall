export function extractNameFromEmail(email: string): string {
  const parts = email.split("@");

  return parts[0] ?? "";
}
