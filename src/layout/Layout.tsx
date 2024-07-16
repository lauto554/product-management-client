import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-5 xl:mx-auto md:max-w-6xl py-10">
          <Link to={'/'} className="text-2xl md:text-3xl font-extrabold text-white">
            Administrador de Productos
          </Link>
        </div>
      </header>

      <main className="m-2 md:mx-auto md:mt-10 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-1 md:p-10 bg-white shadow rounded">
        <Outlet />
      </main>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
