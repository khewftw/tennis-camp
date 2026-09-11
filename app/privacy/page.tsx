import { LegalDocument, legalMetadata } from "@/src/components/ui/LegalDocument";

export const metadata = legalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalDocument doc="privacy" />;
}
