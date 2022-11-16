import mongoose, { Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  complete: boolean;
  tags: string[];
}

let todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
      required: true,
    },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>('Todo', todoSchema);
