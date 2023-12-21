'use client'
import {FC} from "react";
import {CldImage} from 'next-cloudinary';

interface ProductImageProps {
    productImage: string;
    productTitle: string;
}

const ProductImage: FC<ProductImageProps> = ({productImage, productTitle}) => {
    if (productImage) {
        return (
            <>
                <h4>Current Image</h4>
                <CldImage
                    src={`${productImage}`}
                    alt={`Imagen del producto: ${productTitle}`}
                    width={150}
                    height={100}
                    className="max-w-full h-auto rounded-lg"
                    placeholder="blur"
                    blurDataURL="/loading.png"
                />
            </>
        )
    }
}


export default ProductImage;
