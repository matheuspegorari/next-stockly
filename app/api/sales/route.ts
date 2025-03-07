import { upsertSale } from "@/app/_actions/sales/create-sale";
import { deleteSale } from "@/app/_actions/sales/delete-sale";
import { getSales } from "@/app/_data-access/sales/get-sales";
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const sales = await getSales();
  return NextResponse.json(sales, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { id, products } = body;

    const result = await upsertSale({ id, products });
    if (result?.validationErrors) {
      return NextResponse.json(
        { success: false, data: result },
        { status: 400 },
      );
    }
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

    const { id, products } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID da venda é obrigatório." },
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

    const result = await upsertSale({ id, products });
    if (result?.validationErrors) {
      return NextResponse.json(
        { success: false, data: result },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
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

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
    
        const { id } = body;
        if (!id) {
          return NextResponse.json(
            { success: false, error: "ID da venda é obrigatório." },
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
    
        const result = await deleteSale({ id });
        if (result?.validationErrors) {
          return NextResponse.json(
            { success: false, data: result },
            { status: 400 },
          );
        }
        return NextResponse.json({ success: true, data: result }, { status: 200 });
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


