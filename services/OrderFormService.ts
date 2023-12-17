const postOrderForm = async (values, cart, { setSubmitting }) => {

    const orderData = {
        ...values,
        cartItems: cart.items,
        totalPayment: cart.totalPayment,
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);

        // Aquí podrías redirigir o manejar la respuesta exitosa.
    } catch (error) {
        console.error('Error submitting order:', error);
    }

    setSubmitting(false);
};
