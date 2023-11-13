import {NextRequest, NextResponse} from 'next/server';
import {collection, getDocs, query, where, doc, setDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function GET(request: NextRequest) {
    const categoryParam = request.nextUrl.searchParams.get('category');

    let q;
    if (categoryParam) {
        if (!isNaN(Number(categoryParam))) {
            q = query(collection(db, "products"), where("categoryId", "==", Number(categoryParam)));
        } else {
            q = query(collection(db, "products"), where("categoryName", "==", categoryParam));
        }
    } else {
        q = query(collection(db, "products"));
    }

    try {
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
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const productData = await request.json();
        const productsCol = collection(db, "products");
        const newDocRef = doc(productsCol);

        await setDoc(newDocRef, productData);

        return new NextResponse(JSON.stringify({ id: newDocRef.id }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
