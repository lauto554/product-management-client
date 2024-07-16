import { PropsWithChildren } from 'react';

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="text-center mt-8 bg-red-500 text-white font-bold p-2 rounded-lg">
      {children}
    </div>
  );
}
