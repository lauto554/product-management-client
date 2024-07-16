import { Product } from '../types';

type ProductFormProps = {
  product?: Product;
};

export default function ProductForm({ product }: ProductFormProps) {
  return (
    <>
      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="text-slate-500 text-lg font-semibold">
          Nombre del Producto:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="p-3 mt-3 block rounded bg-gray-300"
          placeholder="Ingresa aquí el nombre del producto"
          defaultValue={product?.name || ''}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="price" className="text-slate-500 text-lg font-semibold">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          name="price"
          className="p-3 mt-3 block rounded bg-gray-300"
          placeholder="Ingresa aquí el precio del producto"
          defaultValue={product?.price || ''}
        />
      </div>
    </>
  );
}
