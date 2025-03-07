import { deleteSale } from "@/app/_actions/sales/delete-sale";
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const existingSale = await db.sale.findUnique({
    where: { id },
    include: {
      saleProducts: true
    }
  });
  if (!existingSale) {
    return NextResponse.json(
      { success: false, error: "Venda não encontrada." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ...existingSale }, { status: 200 });
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

    const existingSale = await db.sale.findUnique({
      where: { id },
    });
    if (!existingSale) {
      return NextResponse.json(
        { success: false, error: "Venda não encontrada." },
        { status: 404 },
      );
    }

    await deleteSale({ id });

    return NextResponse.json(
      { success: true, message: "Venda deletada com sucesso." },
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
