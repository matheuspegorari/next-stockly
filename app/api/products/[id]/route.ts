import { deleteProduct } from "@/app/_actions/products/delete-product";
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const existingProduct = await db.product.findUnique({
    where: { id },
  });
  if (!existingProduct) {
    return NextResponse.json(
      { success: false, error: "Produto não encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ...existingProduct }, { status: 200 });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required." },
        { status: 400 },
      );
    }

    const existingProduct = await db.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Produto não encontrado." },
        { status: 404 },
      );
    }

    await deleteProduct({ id });

    return NextResponse.json(
      { success: true, message: "Product deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    let errorMessage = "Unexpected error.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
