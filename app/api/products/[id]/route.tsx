import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
    const categoryParam = params.category;
    let q;

    // ... (código omitido para brevedad)

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return new NextResponse(JSON.stringify(products), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
