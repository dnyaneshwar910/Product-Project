// src/app/api/examples/route.js
import connectToDatabase from '../../../lib/mongodb';
import Example from '../../../models/example';

export async function GET() {
  await connectToDatabase();
  const examples = await Example.find();
  return Response.json(examples);
}

export async function POST(request) {
  const { name } = await request.json();
  await connectToDatabase();
  const newExample = await Example.create({ name });
  return Response.json(newExample);
}
