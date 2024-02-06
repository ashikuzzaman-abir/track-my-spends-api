import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for your document
export interface ExpenseType extends Document {
  // Define your document properties here
  title: string;
  amount: number;
  moment: Date;
  user: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId;
}

// Define the schema for your model
const expenseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Category',
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    moment: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create and export the model
const expense = mongoose.model<ExpenseType>('Expense', expenseSchema);
export default expense;
