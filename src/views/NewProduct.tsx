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
      <div className="flex flex-col justify-between mb-3 md:mb-8 p-2">
        <div className="flex justify-between items-center mt-2">
          <h2 className="ml-1 text-3xl md:text-4xl font-black text-cyan-700 underline decoration-cyan-700 decoration-4">
            Nuevo Producto
          </h2>
          <Link
            to={'/'}
            className="bg-emerald-700 p-2 text-sm md:text-base font-bold text-white shadow-md hover:bg-emerald-800 rounded-lg"
          >
            Volver
          </Link>
        </div>
        <p className="mt-6 text-base md:text-lg">
          Llena el siguiente formulario para almacenar un{' '}
          <span className="italic"> nuevo producto</span>
        </p>
        <div className="border-t-2 mt-6 md:mt-10"></div>
      </div>

      {errors?.field && <ErrorMessage>{errors.field}</ErrorMessage>}
      {errors?.price && <ErrorMessage>{errors.price}</ErrorMessage>}

      <Form className="mt-3 p-2" method="POST">
        <ProductForm />
        <input
          type="submit"
          value="Crear Producto"
          className="w-full text-lg font-bold mt-5 p-3  text-white bg-cyan-700 hover:bg-cyan-800 cursor-pointer rounded"
        />
      </Form>
    </>
  );
}
