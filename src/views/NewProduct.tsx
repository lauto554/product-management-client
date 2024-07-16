import { ActionFunctionArgs, Form, Link, redirect, useActionData } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ErrorMessage from '../components/ErrorMessage';
import { addProduct } from '../services/ProductService';
import { toast } from 'react-toastify';
import { ErrorData } from '../types';

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

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
    await addProduct(formData);
    toast.success('Producto agregado!');
    return redirect('/');
  } catch (error) {
    toast.error('Hubo un error al agregar el producto');
    console.log(error);
  }
}

export default function NewProduct() {
  const errors = useActionData() as ErrorData;

  return (
    <>
      <div className="flex flex-col justify-between mb-8">
        <div className="flex justify-between">
          <h2 className="text-4xl font-black text-cyan-700 underline decoration-cyan-700 decoration-4">
            Nuevo Producto
          </h2>
          <Link
            to={'/'}
            className="bg-emerald-700 p-3 text-base font-bold text-white shadow-md hover:bg-emerald-800 rounded"
          >
            Volver a Productos
          </Link>
        </div>
        <p className="mt-8 text-lg">
          Llena el siguiente formulario para almacenar un{' '}
          <span className="italic"> nuevo producto</span>
        </p>
      </div>
      <div className="w-full border-t-2"></div>

      {errors?.field && <ErrorMessage>{errors.field}</ErrorMessage>}
      {errors?.price && <ErrorMessage>{errors.price}</ErrorMessage>}

      <Form className="mt-8" method="POST">
        <ProductForm />
        <input
          type="submit"
          value="Crear Producto"
          className="w-full text-lg font-bold mt-8 p-3  text-white bg-cyan-700 hover:bg-cyan-800 cursor-pointer rounded"
        />
      </Form>
    </>
  );
}
