'use client'
import {FC, useRef} from 'react';
import {Formik, Field, Form, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup';
import {ICategory} from "@/interfaces/ICategory";

interface CreateProductFormProps {
    categories: ICategory[];
}

const initialValues = {
    title: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: null,
};

const ProductSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    stock: Yup.number().required('Required'),
    categoryId: Yup.string().required('Required'),
    image: Yup.mixed().required('A file is required'),
});

const CreateProductForm: FC<CreateProductFormProps> = ({categories}) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (
        values: typeof initialValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setSubmitting(true);

        try {
            // Subir imagen
            const imageData = new FormData();
            imageData.append('image', values.image);

            const imageResponse = await fetch('/api/upload', {
                method: 'POST',
                body: imageData,
            });

            if (!imageResponse.ok) {
                throw new Error('Error uploading image');
            }

            const imageResult = await imageResponse.json();
            const imageName = imageResult.fileName;

            // Crear producto
            const productData = {
                title: values.title,
                description: values.description,
                price: values.price,
                stock: values.stock,
                categoryId: values.categoryId,
                image: imageName,
            };

            const productResponse = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!productResponse.ok) {
                throw new Error('Error creating product');
            }

            const productResult = await productResponse.json();
            console.log('Product created:', productResult);

        } catch (error) {
            console.error('Error:', error);
        }

        setSubmitting(false);
    };

    const FileInput = ({ ...props }) => {
        const [field, meta, helpers] = useField(props);

        const handleChange = (event) => {
            const files = event.target.files;
            let file = null;
            if (files && files.length) {
                file = files[0];
            }
            helpers.setValue(file);
        };

        return (
            <>
                <input type="file" onChange={handleChange} {...props} />
                {meta.touched && meta.error ? (
                    <div className="text-red-500 text-xs italic">{meta.error}</div>
                ) : null}
            </>
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title</label>
                        <Field type="text" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="title" component="div" className="text-red-300 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-white text-sm font-bold mb-2">Description</label>
                        <Field type="text" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-white text-sm font-bold mb-2">Price</label>
                        <Field type="number" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="price" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-white text-sm font-bold mb-2">Image</label>
                        <FileInput name="image"/>
                        <ErrorMessage name="image" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-white text-sm font-bold mb-2">Stock</label>
                        <Field type="number" name="stock" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="stock" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="categoryId" className="block text-white text-sm font-bold mb-2">Category</label>
                        <Field as="select" name="categoryId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id.toString()} value={category._id.toString()}>
                                    {category.title}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoryId" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                            ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                    >
                        Create Product!
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateProductForm;
