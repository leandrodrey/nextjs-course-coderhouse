import {FC} from "react";
import UploadImageForm from "@/components/forms/UploadImageForm";
import {IProductWithCategory} from "@/interfaces/IProduct";
import {getProductById} from "@/services/ProductService";
import ProductImage from "@/components/ui/ProductImage";



interface UploadImagePageProps {
    params: {
        productId: string;
    };
}

const UploadImagePage: FC<UploadImagePageProps> = async ({params}) => {

    const {productId} = params;
    const product: IProductWithCategory = await getProductById(productId);

    if (!product) {
        return <div className="text-center text-xl text-red-500 p-5">Product Not Found</div>;
    }

    return (
        <>
            <h2 className='mb-5 text-2xl'>Upload or Update an Image for <span className="text-blue-300">{product.title}</span></h2>
            <ProductImage productImage={product.image} productTitle={product.title} />
            <UploadImageForm productId={productId}/>
        </>
    )
}

export default UploadImagePage;
