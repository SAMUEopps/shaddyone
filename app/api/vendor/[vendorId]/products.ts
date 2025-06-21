import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export default auth(async (req, res) => {
  const host = req.headers.get('host');
  const url = new URL(req.url ?? '', `http://${host}`);
  const vendorId = url.pathname.split('/').filter(Boolean).pop();
  if (!req.auth || req.auth.user?._id !== vendorId) {
    return new Response(JSON.stringify({ message: 'unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await dbConnect();
  const products = await ProductModel.find({ vendor: vendorId });
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});