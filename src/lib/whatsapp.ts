const DEFAULT_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56965967077";

export function buildWhatsAppUrl(message: string, phone = DEFAULT_PHONE) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function buildProductInquiryMessage(productName: string, brand?: string) {
  return `Hola Coipo Racing 🏁 Me interesa el producto: *${productName}*${brand ? ` de ${brand}` : ""}. ¿Está disponible y cuál es el precio? 💪`;
}

export function buildGeneralMessage() {
  return `Hola Coipo Racing 🏁 Quisiera consultar por sus productos de suplementación deportiva 💪`;
}
