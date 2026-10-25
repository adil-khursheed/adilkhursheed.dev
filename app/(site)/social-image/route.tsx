import { renderSocialImage } from "@/lib/og-image";

export const dynamic = "force-static";

export function GET() {
  return renderSocialImage();
}
