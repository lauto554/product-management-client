import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  const productId = +params.id!;
  await deleteProduct(productId);

  return redirect('/');
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();

  const isAvailable = product.availability;
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-2 text-sm md:text-lg text-gray-800">{product.name}</td>
      <td className="p-2 text-sm md:text-lg text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-2 text-sm md:text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? 'text-black' : 'text-red-600'
            } rounded-lg p-1 text-sm uppercase font-bold w-full border border-black-100`}
          >
            {isAvailable ? 'Disponible' : 'No disponible'}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-2 text-lg text-gray-800 ">
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="button"
            className="p-1 rounded w-full bg-cyan-700 text-white text-sm uppercase"
            onClick={() => {
              navigate(`/productos/${product.id}/editar`);
            }}
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm('¿Seguro quieres eliminar este producto?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              className="p-2 rounded w-full bg-red-600 text-white text-sm uppercase cursor-pointer"
              value="Eliminar"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
