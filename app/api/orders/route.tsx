import { NextRequest, NextResponse } from 'next/server';
import OrderModel from '@/models/Order';
import { db } from '@/database';

export async function POST(request: NextRequest): Promise<NextResponse> {
    await db.connect();

    try {
        const orderData = await request.json();
        const newOrder = new OrderModel(orderData);
        const savedOrder = await newOrder.save();

        const responseObj = {
            message: 'Order created successfully',
            orderNumber: savedOrder.id
        };

        return new NextResponse(JSON.stringify(responseObj), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        let errorMessage = 'An error occurred while creating the order.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await db.disconnect();
    }
}
