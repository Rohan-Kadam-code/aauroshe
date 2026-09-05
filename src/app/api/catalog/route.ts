import { NextResponse } from "next/server";
import { catalogService } from "@/services/catalog/catalogService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as any) || undefined;

    const products = await catalogService.getAllProducts({
      category,
      search,
      sort,
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch catalogue" },
      { status: 500 }
    );
  }
}
