import {NextRequest, NextResponse} from 'next/server';
import {collection, getDocs, query, where, doc, setDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
    const categoryParam = params.category;
    let q;

    if (categoryParam === 'all') {
        q = query(collection(db, "products"));
    } else {
        const numericCategoryId = parseInt(categoryParam);
        if (!isNaN(numericCategoryId)) {
            q = query(collection(db, "products"), where("categoryId", "==", numericCategoryId));
        } else {
            const categorySnapshot = await getDocs(query(collection(db, "category"), where("name", "==", categoryParam)));
            if (!categorySnapshot.empty) {
                const categoryDocData = categorySnapshot.docs[0].data();
                const categoryId = categoryDocData.id;
                q = query(collection(db, "products"), where("categoryId", "==", categoryId));
            } else {
                return new NextResponse(JSON.stringify({ error: 'Category not found' }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }
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
        const productsArray = await request.json();
        const productsCol = collection(db, "products");

        for (const productData of productsArray) {
            const newDocRef = doc(productsCol);
            await setDoc(newDocRef, productData);
        }

        return new NextResponse(JSON.stringify({ message: 'Products added successfully' }), {
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
