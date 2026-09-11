import { LegalDocument, legalMetadata } from "@/src/components/ui/LegalDocument";

export const metadata = legalMetadata("offer");

export default function OfferPage() {
  return <LegalDocument doc="offer" />;
}
