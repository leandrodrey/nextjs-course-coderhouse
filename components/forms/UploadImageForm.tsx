'use client'
import { useRouter } from 'next/navigation';
import {FC, useCallback, useState} from "react";
import {FileWithPath, useDropzone} from 'react-dropzone';
import {CldImage} from 'next-cloudinary';
import Loader from "@/components/ui/Loader";

interface UploadImageFormProps {
    productId: string;
}

type CustomErrorEvent = {
    code: string;
    message: string;
};

const UploadImageForm: FC<UploadImageFormProps> = ({productId}) => {

    const [uploadImageUrl, setUploadImageUrl] = useState(null);
    const [uploadImagePublicId, setUploadImagePublicId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onUpload = useCallback(async (acceptedFiles: FileWithPath[]) => {
        setIsLoading(true);
        const image = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', "ml_default");
        try {
            const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                const imageResponseData = await uploadResponse.json();
                const imageUrl = imageResponseData.secure_url;
                const imageId = imageResponseData.public_id;
                setUploadImageUrl(imageUrl);
                setUploadImagePublicId(imageId);
                setIsLoading(false);
            } else {
                console.error("Error al cargar la imagen");
            }
        } catch (error) {
            console.error("Error en la carga", error);
        }
    }, []);

    const handleUpdateProduct = async () => {

        if (!uploadImagePublicId) {
            console.error("No se ha subido ninguna imagen");
            return;
        }

        const updateResponse = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({image: uploadImagePublicId}),
        });

        if (updateResponse.ok) {
            router.push("/admin");
        } else {
            console.error("Error al actualizar la imagen");
        }
    }

    const {getRootProps, getInputProps, acceptedFiles, fileRejections} = useDropzone({
        maxFiles: 1,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
        },
        onDropAccepted: onUpload
    });

    const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path} className="text-lg text-white">
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({file, errors}: {
        file: FileWithPath,
        errors: CustomErrorEvent[]
    }) => (
        <li key={file.path} className="text-sm text-red-500">
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e: CustomErrorEvent) => <li key={e.code} className="text-xs">{e.message}</li>)}
            </ul>
        </li>
    ));

    if (isLoading) return (
        <section className="container mx-auto p-4">
            <div className="flex-grow">
                <Loader/>
            </div>
        </section>
    )

    return (
        <section className="container mx-auto p-4">
            <div className="items-center mb-3">
                <div {...getRootProps({className: 'dropzone border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer flex-grow md:h-20  hover:border-blue-300'})}>
                    <input {...getInputProps()} />
                    <p className="text-blue-500 text-xl font-semibold">Drag and drop some files here, or click to select files</p>
                    <em className="text-gray-300 text-sm">(Only 1 file and *.jpg and *.png images will be accepted)</em>
                </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row">
                {acceptedFileItems.length > 0 && uploadImageUrl && (
                    <div className="mt-4">
                        <CldImage
                            src={uploadImageUrl}
                            alt={`Imagen del producto`}
                            width={600}
                            height={300}
                            className="max-w-full h-auto rounded-lg"
                            placeholder="blur"
                            blurDataURL="/loading.png"
                        />
                    </div>
                )}
                <div className="pl-4 mt-4">
                    {acceptedFileItems.length > 0 && (
                        <>
                            <div className="flex flex-col justify-between">
                                <ul className="text-white text-lg">{acceptedFileItems}</ul>
                                {uploadImageUrl && (
                                    <>
                                        <h4 className="text-green-600 mb-4">Image successfully uploaded</h4>
                                        <button className="bg-blue-300 text-black text-lg py-1 px-2 rounded transition duration-300 hover:bg-blue-600 shadow hover:text-white"
                                            onClick={() => handleUpdateProduct()}>
                                            Confirm Image and Update Product
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                    {fileRejectionItems.length > 0 && (
                        <>
                            <h4 className="text-lg font-semibold mt-2">Wrong Files</h4>
                            <ul>{fileRejectionItems}</ul>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default UploadImageForm;
