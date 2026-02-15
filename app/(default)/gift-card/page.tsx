import { getGiftCardProduct } from "@/components/custom/giftCard/datas/giftCardPdp.api";
import GiftCardPageWrapper from "@/components/custom/giftCard/giftCardPageWrapper";

export default async function page() {
    const data = await getGiftCardProduct("gift-card");
    const giftcardData = data?.products.items[0];

    return <GiftCardPageWrapper giftcardData={giftcardData} />;
}
