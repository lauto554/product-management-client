import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getProductById, updateProduct } from '../services/ProductService';
import { ErrorData, Product } from '../types';
import { toast } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage';

export async function loader({ params }: LoaderFunctionArgs) {
  const productId = +params.id!;
  const product = await getProductById(productId);
  if (!product) {
    return redirect('/');
  }
  return product;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const productId = +params.id!;

  let errors: ErrorData = {};

  if (Object.values(formData).includes('')) {
    errors.field = 'Todos los campos son obligatorios';
    return errors;
  }

  if (+formData.price <= 0) {
    errors.price = 'El precio del Producto debe ser mayor a 0';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  try {
    await updateProduct(productId, formData);
    toast.success('Edición exitosa');
    return redirect('/');
  } catch (error) {
    toast.error('Hubo un error al editar el producto');
    console.log(error);
  }
}

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false },
];

export default function EditProduct() {
  const product = useLoaderData() as Product;
  const errors = useActionData() as ErrorData;

  return (
    <>
      <div className="flex flex-col justify-between mb-8">
        <div className="flex justify-between">
          <h2 className="text-4xl font-black text-cyan-700 underline decoration-cyan-700 decoration-4">
            Editar Producto
          </h2>
          <Link
            to={'/'}
            className="bg-emerald-700 p-3 text-base font-bold text-white shadow-md hover:bg-emerald-800 rounded"
          >
            Volver a Productos
          </Link>
        </div>
        <p className="mt-8 text-lg">
          Llena el siguiente formulario para realizar cambios en el{' '}
          <span className="italic"> producto</span>
        </p>
      </div>

      <div className="w-full border-t-2"></div>

      {errors?.field && <ErrorMessage>{errors.field}</ErrorMessage>}
      {errors?.price && <ErrorMessage>{errors.price}</ErrorMessage>}

      <Form className="mt-8" method="PUT">
        <ProductForm product={product} />
        <div className="mb-4">
          <label htmlFor="availability" className="text-slate-500 text-lg font-semibold">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="p-3 mt-3 w-full block rounded bg-gray-300"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          value="Guardar Cambios"
          className="w-full text-lg font-bold mt-8 p-3  text-white bg-cyan-700 hover:bg-cyan-800 cursor-pointer rounded"
        />
      </Form>
    </>
  );
}
