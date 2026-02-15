import { PdpPageProps } from "@/components/custom/pdp/datas/pdpData.api";
import PdpWrapper from "@/components/custom/pdp/pdpWrapper";

export default function PdpPage({
    productData,
    currency,
    lensData,
}: PdpPageProps) {
    return (
        <PdpWrapper
            productData={productData}
            currency={currency}
            lensData={lensData}
        />
    );
}
