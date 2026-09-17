export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const qty = parseInt(req.query.quantity) || 100;
  let basePrice = 100;
  if (req.query.cardType === 'RFID') basePrice = 150;
  let lanyardPrice = req.query.lanyards === 'true' ? 40 : 0;
  let discount = qty >= 500 ? 0.2 : (qty >= 200 ? 0.1 : 0);
  const unitPrice = (basePrice + lanyardPrice) * (1 - discount);
  res.status(200).json({ quantity: qty, cardType: req.query.cardType || 'PVC', unitPriceINR: Math.round(unitPrice), totalPriceINR: Math.round(unitPrice * qty) });
}
