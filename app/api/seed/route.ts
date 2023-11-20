import {NextRequest, NextResponse} from "next/server";
import {Types} from "mongoose";
import ProductModel from "@/models/Products";
import {db} from "@/database";
import {seedData} from "@/database/seed-data";
import CategoryModel from "@/models/Category";

export async function POST(request: NextRequest) {

    await db.connect();

    await ProductModel.deleteMany();
    seedData.products.forEach(product => {
        product.categoryId = new Types.ObjectId();
    });
    await ProductModel.insertMany(seedData.products);

    await CategoryModel.deleteMany();
    await CategoryModel.insertMany(seedData.categories);


    await db.disconnect();

    let json_response = {
        status: 200,
        message: "se ha cargado la data correctamente",
    };
    return new NextResponse(JSON.stringify(json_response));

}
