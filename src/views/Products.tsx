import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getProducts, updateAvailability } from '../services/ProductService';
import { Product } from '../types';
import ProductDetails from '../components/ProductDetails';

export async function loader() {
  const products = await getProducts();

  if (!products) {
    return <div>No se encontraron productos.</div>;
  }
  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  await updateAvailability(+data.id);

  return null;
}

export default function Products() {
  const products = useLoaderData() as Product[];

  const productList = Array.isArray(products) ? products : [];

  return (
    <>
      <div className="flex flex-col justify-between mb-8 p-3">
        <div className="flex gap-3 md:gap-0 justify-between items-center">
          <h2 className="text-4xl font-black text-cyan-700 underline decoration-cyan-700 decoration-4">
            Productos
          </h2>
          <Link
            to={'/productos/nuevo'}
            className="bg-emerald-700 py-2 px-4 text-3xl font-bold text-white shadow-md hover:bg-emerald-800 rounded-full border-dotted border-2"
          >
            +
          </Link>
        </div>
        <p className="mt-8 text-lg">Aquí encontrarás todos los productos que has registrado</p>
      </div>

      <div className="md:w-full border-t-2 px-5"></div>

      <div className="">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="py-2 text-sm md:text-lg">Producto</th>
              <th className="py-2 text-sm md:text-lg">Precio</th>
              <th className="py-2 text-sm md:text-lg">Disponibilidad</th>
              <th className="py-2 text-sm md:text-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productList.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 md:mt-5">
                  Aún no hay productos cargados...
                </td>
              </tr>
            ) : (
              productList.map((product) => <ProductDetails key={product.id} product={product} />)
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
