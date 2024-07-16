import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getProducts, updateAvailability } from '../services/ProductService';
import { Product } from '../types';
import ProductDetails from '../components/ProductDetails';

export async function loader() {
  const products = await getProducts();

  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  await updateAvailability(+data.id);

  return {};
}

export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex flex-col justify-between mb-8">
        <div className="flex justify-between">
          <h2 className="text-4xl font-black text-cyan-700 underline decoration-cyan-700 decoration-4">
            Productos
          </h2>
          <Link
            to={'/productos/nuevo'}
            className="bg-emerald-700 p-3 text-base font-bold text-white shadow-md hover:bg-emerald-800 rounded"
          >
            Agregar Producto
          </Link>
        </div>
        <p className="mt-8 text-lg">Aquí encontrarás todos los productos que has registrado</p>
      </div>

      <div className="w-full border-t-2"></div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
