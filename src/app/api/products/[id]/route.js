import connectToDatabase from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export async function PUT(req, { params }) {
  const body = await req.json();
  await connectToDatabase();
  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await Product.findByIdAndDelete(params.id);
  return Response.json({ message: 'Deleted' });
}
