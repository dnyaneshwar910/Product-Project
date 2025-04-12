// src/models/Example.js
import mongoose from 'mongoose';

const ExampleSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.models.Example || mongoose.model('Example', ExampleSchema);
