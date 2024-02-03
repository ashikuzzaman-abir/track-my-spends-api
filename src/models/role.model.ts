/* 
initial role model works without role based access, however it is not implemented yet.
author: Kazi Ehsanul Mubin
*/

import mongoose, { Document } from 'mongoose';

type RoleType = Document & {
  name: string;
  description?: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  isActive: boolean;
  permissions: string[];
  image?: string;
};

const schema = new mongoose.Schema<RoleType>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
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
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    permissions: [String],

    image: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Role = mongoose.model('Role', schema);
export default Role;
