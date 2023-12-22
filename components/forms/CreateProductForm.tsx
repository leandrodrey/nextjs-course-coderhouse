'use client'
import React, {FC, useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {ICategory} from "@/interfaces/ICategory";
import ProductSuccess from "@/components/ui/ProductSuccess";

interface CreateProductFormProps {
    categories: ICategory[];
}

const initialValues = {
    title: '',
    description: '',
    price: '',
    stock: '',
    categoryId: ''
};

const ProductSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    stock: Yup.number().required('Required'),
    categoryId: Yup.string().required('Required')
});

const CreateProductForm: FC<CreateProductFormProps> = ({categories}) => {

    const [productCreated, setProductCreated] = useState('');
    const [productCreatedId, setProductCreatedId] = useState('');

    const handleSubmit = async (
        values: typeof initialValues,
        {setSubmitting}: FormikHelpers<typeof initialValues>
    ) => {
        setSubmitting(true);
        try {
            const productData = {
                title: values.title,
                description: values.description,
                price: values.price,
                stock: values.stock,
                categoryId: values.categoryId,
            };
            const productResponse = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!productResponse.ok) {
                const errorResponse = await productResponse.json();
                const errorMessage = errorResponse.error || 'Error creating product';
                console.error('Error:', errorMessage);
            }
            const productResult = await productResponse.json();
            setProductCreated(productResult.title);
            setProductCreatedId(productResult.id);
        } catch (error) {
            console.error('Error during fetch:', error);
        }
        setSubmitting(false);
    };

    if (productCreated) {
        return (
            <ProductSuccess productTitle={productCreated} productId={productCreatedId} action="create"/>
        )
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
                <Form className="p4 md:p-6 md:flex md:flex-wrap md:items-start justify-between">
                    <div className="mb-4 md:pr-2  md:w-1/2 ">
                        <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title</label>
                        <Field type="text" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="title" component="div" className="text-red-300 text-xs italic"/>
                    </div>

                    <div className="mb-4 md:pl-2 md:w-1/2">
                        <label htmlFor="price" className="block text-white text-sm font-bold mb-2">Price</label>
                        <Field type="number" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="price" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4 md:pr-2 md:w-1/2">
                        <label htmlFor="stock" className="block text-white text-sm font-bold mb-2">Stock</label>
                        <Field type="number" name="stock" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="stock" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mb-4 md:pl-2 md:w-1/2">
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

                    <div className="mb-4 md:pl-2 w-full">
                        <label htmlFor="description" className="block text-white text-sm font-bold mb-2">Description</label>
                        <Field as="textarea" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic"/>
                    </div>

                    <div className="mt-6 pr-2 flex w-full items-center justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`md:w-1/4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                            ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                        >
                            Create Product!
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateProductForm;
