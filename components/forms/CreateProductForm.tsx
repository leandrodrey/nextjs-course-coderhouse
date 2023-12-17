'use client'
import {FC, useRef} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const initialValues = {
    title: '',
    description: '',
    price: '',
    stock: '',
};

const ProductSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    stock: Yup.number().required('Required'),
});

const CreateProductForm: FC = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (
        values: typeof initialValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('stock', values.stock.toString());
        if (fileInputRef.current?.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData, // Enviar como FormData en lugar de JSON
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error submitting product:', error);
        }

        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
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
                        <Field ref={fileInputRef} type="file" name="image" className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="image" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-white text-sm font-bold mb-2">Stock</label>
                        <Field type="number" name="stock" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="stock" component="div" className="text-red-500 text-xs italic"/>
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
