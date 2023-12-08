import {FC} from "react";
import type {Metadata, ResolvingMetadata} from 'next';
import {IProductWithCategory} from "@/interfaces/IProduct";
import {getProductById} from "@/services/ProductService";
import ProductCardDetail from "@/components/ui/ProductCardDetail";

export const dynamic = 'force-dynamic';

type Props = {
    params: { id: number }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const {id} = params;
    const product: IProductWithCategory | undefined  = await getProductById(params.id);

    if (!product) {
        return {
            title: "Producto no encontrado",
            description: "El producto solicitado no existe en nuestra base de datos.",
        };
    }
    return {
        title: product.title,
        description: product.description,
    }
}

interface ProductDetailProps {
    params: {
        id: number;
    };
}

const ProductDetailPage: FC<ProductDetailProps> = async ({params}) => {

    const {id} = params;
    const product: IProductWithCategory = await getProductById(id);

    if (!product) {
        return <div className="text-center text-xl text-red-500 p-5">Producto no encontrado</div>;
    }

    return (
        <div className="container mx-auto mt-10 md:p-5">
            <ProductCardDetail product={product} />
        </div>
    );
};

export default ProductDetailPage;
