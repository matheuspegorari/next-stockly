import { deleteProduct } from "@/app/_actions/products/delete-product";
import { upsertProduct } from "@/app/_actions/products/upsert-product";
import { upsertProductSchema } from "@/app/_actions/products/upsert-product/schema";
import { cachedGetProducts } from "@/app/_data-access/product/get-products";
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

// apenas para fins de demonstração do Route Handlers do nextjs
// documentação: https://nextjs.org/docs/api-routes/introduction

export async function GET() {
  const products = await cachedGetProducts();
  return NextResponse.json(products, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, stock } = body;

    const result = await upsertProduct({ name, price, stock });
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "ID do produto é obrigatório." },
        { status: 400 },
      );
    }

    const existingProduct = await db.product.findUnique({
      where: { id: body.id },
    });
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Produto não encontrado." },
        { status: 404 },
      );
    }

    const updatedData = {
      id: body.id,
      name: body.name ?? existingProduct.name, // Se name não foi enviado, mantém o existente
      price: body.price ?? existingProduct.price,
      stock: body.stock ?? existingProduct.stock,
    };

    const validatedData = upsertProductSchema.parse(updatedData);

    const result = await upsertProduct(validatedData);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    let errorMessage = "Erro inesperado.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID do produto é obrigatório." },
        { status: 400 },
      );
    }

    const result = await deleteProduct({ id });

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Produto não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Produto deletado com sucesso." },
      { status: 200 },
    );
  } catch (error) {
    let errorMessage = "Erro inesperado.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
