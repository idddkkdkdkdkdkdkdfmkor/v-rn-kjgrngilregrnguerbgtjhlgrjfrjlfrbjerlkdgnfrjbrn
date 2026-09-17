export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ orderId: req.query.orderId || 'UNKNOWN', status: 'IN_PRODUCTION' });
}
