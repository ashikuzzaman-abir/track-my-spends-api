import mongoose from 'mongoose';

export type CategoryType = {
  name: string;
  description?: string;
  createdBy?: mongoose.Schema.Types.ObjectId;
  icon?: string;
};

const schema = new mongoose.Schema<CategoryType>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      // unique: true,
    },

    description: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    icon: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', schema);

export default Category;
