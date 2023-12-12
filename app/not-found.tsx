import {NextPage} from 'next';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Image
                src="/gamebazar/404error.png"
                alt="Page Not Found"
                width={400}
                height={400}
            />
            <h1 className="text-6xl font-bold text-gray-300 mt-6">Oops!</h1>
            <p className="text-xl text-gray-400 mt-2">No pudimos encontrar la página que estabas buscando.</p>
            <Link className="mt-6 px-4 py-2 text-blue-300 rounded hover:text-blue-600 transition duration-300" href="/">
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;
