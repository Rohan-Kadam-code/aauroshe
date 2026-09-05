import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/security/adminAuth";
import { createProductSchema } from "@/core/validators/product.schema";
import { MOCK_PRODUCTS } from "@/services/catalog/mockCatalogData";
import { slugify } from "@/lib/utils";
import { z } from "zod";

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: MOCK_PRODUCTS,
  });
}

export async function POST(request: Request) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = createProductSchema.parse(body);

    const newProduct = {
      id: `prod_${Date.now()}`,
      slug: slugify(validated.title),
      title: validated.title,
      subtitle: validated.subtitle,
      description: validated.description,
      longDescription: validated.longDescription || validated.description,
      categoryId: validated.categoryId,
      categorySlug: validated.categorySlug,
      categoryName: validated.categoryName,
      price: validated.price,
      originalPrice: validated.originalPrice,
      badge: validated.badge,
      thumbnail: validated.thumbnail,
      images: validated.images,
      rating: 5.0,
      reviewCount: 0,
      isFeatured: validated.isFeatured,
      isNewArrival: true,
      inStock: validated.inStock,
      fragranceNotes: validated.fragranceNotes,
      materials: validated.materials,
      variants: [
        {
          id: `var_${Date.now()}`,
          sku: `AUR-${slugify(validated.title).toUpperCase().slice(0, 8)}-STD`,
          name: "Standard Edition",
          price: validated.price,
          stockCount: validated.stockCount,
          inStock: validated.stockCount > 0,
          attributes: { size: "Standard" },
        },
      ],
      createdAt: new Date().toISOString(),
    };

    // In a live database with Prisma, this would run: await prisma.product.create({ data: newProduct })
    MOCK_PRODUCTS.unshift(newProduct as any);

    return NextResponse.json({
      success: true,
      message: "Product created securely.",
      data: newProduct,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.errors || err.message || "Invalid product payload",
      },
      { status: 400 }
    );
  }
}

const updateSchema = z.object({
  id: z.string().min(1),
  price: z.number().positive().optional(),
  stockCount: z.number().int().nonnegative().optional(),
  inStock: z.boolean().optional(),
});

export async function PUT(request: Request) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = updateSchema.parse(body);

    const product = MOCK_PRODUCTS.find((p) => p.id === validated.id);
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    if (validated.price !== undefined) product.price = validated.price;
    if (validated.inStock !== undefined) product.inStock = validated.inStock;
    if (validated.stockCount !== undefined && product.variants[0]) {
      product.variants[0].stockCount = validated.stockCount;
      product.variants[0].inStock = validated.stockCount > 0;
    }

    return NextResponse.json({
      success: true,
      message: "Product updated securely.",
      data: product,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Invalid update data" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    MOCK_PRODUCTS.splice(index, 1);

    return NextResponse.json({
      success: true,
      message: "Product deleted from catalogue.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
