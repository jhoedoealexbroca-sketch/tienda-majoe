import mongoose, { Schema, Document } from 'mongoose';
import { Product, Size, Color } from '@/types';

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'kids-boys' | 'kids-girls';
  subcategory: string;
  images: string[];
  sizes: Size[];
  colors: Color[];
  stock: number;
  featured: boolean;
  newProduct: boolean;
  onSale: boolean;
}

const ProductSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { 
    type: String, 
    required: true,
    enum: ['men', 'women', 'kids-boys', 'kids-girls']
  },
  subcategory: { type: String, required: true },
  images: { type: [String], required: true },
  sizes: { 
    type: [{
      name: { type: String, required: true },
      value: { type: String, required: true },
      available: { type: Boolean, required: true, default: true }
    }], 
    required: true 
  },
  colors: { 
    type: [{
      name: { type: String, required: true },
      value: { type: String, required: true },
      available: { type: Boolean, required: true, default: true }
    }], 
    required: true 
  },
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, required: true, default: false },
  newProduct: { type: Boolean, required: true, default: false },
  onSale: { type: Boolean, required: true, default: false }
}, {
  timestamps: true
});

// Configurar la transformación del documento
ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(_, ret: any) {
    if (ret._id) {
      ret.id = ret._id.toString();
      ret._id = undefined;
    }
    if (ret.__v !== undefined) {
      ret.__v = undefined;
    }
    return ret;
  }
});

let ProductModel: mongoose.Model<IProduct>;

try {
  // Intentar obtener el modelo existente
  ProductModel = mongoose.model<IProduct>('Product');
} catch {
  // Si el modelo no existe, créalo
  ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
}

export default ProductModel;