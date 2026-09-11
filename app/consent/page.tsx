import { LegalDocument, legalMetadata } from "@/src/components/ui/LegalDocument";

export const metadata = legalMetadata("consent");

export default function ConsentPage() {
  return <LegalDocument doc="consent" />;
}
