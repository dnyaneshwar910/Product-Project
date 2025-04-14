import connectToDatabase from '../../../lib/mongodb';
import Product from '../../../models/Product';

export async function GET() {
  await connectToDatabase();
  const products = await Product.find();
  return Response.json(products);
}

export async function POST(req) {
  const data = await req.json();
  await connectToDatabase();
  const product = await Product.create(data);
  return Response.json(product);
}
