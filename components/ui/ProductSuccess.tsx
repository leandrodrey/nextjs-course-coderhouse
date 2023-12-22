import {CldImage} from "next-cloudinary";
import Link from "next/link";
import React, {FC} from "react";

interface ProductSuccessProps {
    productTitle: string;
    productId: string;
    action: string;
}

const ProductSuccess: FC<ProductSuccessProps> = ({productTitle, productId, action}) => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center md:justify-center h-full py-10">
                <CldImage
                    src="/gamebazar/lqexd8mk3fnofb3z8qj0"
                    alt="successfully"
                    width={300}
                    height={100}
                    className="max-w-full h-auto rounded-lg"
                    placeholder="blur"
                    blurDataURL="/loading.png"
                />
                <div className="p-2 md:pl-4 flex flex-col justify-center items-center">
                    <h3 className="text-2xl"> Your product <span className="text-blue-300">{productTitle}</span> has been {action==="edit" ? "üpdated" : "submitted"} successfully!
                    </h3>
                    <h4 className="text-white text-lg pt-10">Now proceed to the next step and upload an image for your product!</h4>
                    <div className="flex flex-col justify-between pt-5">
                        <Link className="text-blue-500 text-xl p-2 md:p-6 font-semibold" href={`/admin/products/upload/${productId}`} prefetch={false}>
                            Go to upload an image
                        </Link>
                        <Link className="text-blue-500 text-xl p-2 md:p-6" href="/admin" prefetch={false}>
                            Go back to dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSuccess;
