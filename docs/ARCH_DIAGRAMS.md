# AAUROSHE — Architectural & UML Diagrams

This document contains architectural diagrams, UML models, sequence flows, and data entity schemas for the **AAUROSHE Luxury E-Commerce Platform** (Quotation V1.0).

---

## 1. Atomic Component Architecture (Class & Structural Hierarchy)

```mermaid
classDiagram
    direction TB
    
    namespace Atoms {
        class Button {
            +variant: "primary" | "gold" | "outline" | "ghost"
            +size: "sm" | "md" | "lg"
            +isLoading: boolean
        }
        class Badge {
            +type: ProductBadge
            +label: string
        }
        class PriceTag {
            +price: number
            +originalPrice: number
            +formatINR()
        }
        class RatingStars {
            +rating: number
            +reviewCount: number
        }
    }

    namespace Molecules {
        class ProductCard {
            +product: Product
            +handleQuickAdd()
        }
        class CategoryCard {
            +category: CategoryDefinition
        }
        class QuantitySelector {
            +quantity: number
            +max: number
            +onChange()
        }
        class CartItemRow {
            +item: CartItem
            +onUpdateQuantity()
            +onRemove()
        }
        class SearchBar {
            +query: string
            +onSearch()
        }
        class FilterPill {
            +label: string
            +isActive: boolean
        }
    }

    namespace Organisms {
        class Navbar {
            +stickyScrolledState
            +cartTrigger
            +mobileMenu
        }
        class HeroBanner {
            +editorialBackground
            +valueStrip
        }
        class CategoryShowcase {
            +tenMaisonsGrid
        }
        class ProductGrid {
            +categoryFilter
            +sortingEngine
        }
        class CartDrawer {
            +freeShippingIndicator
            +couponEngine
            +checkoutRedirect
        }
        class Footer {
            +brandStory
            +policies
        }
    }

    namespace Templates {
        class StorefrontLayout {
            +Navbar
            +CartDrawer
            +Footer
        }
    }

    Button ..> ProductCard : utilizes
    PriceTag ..> ProductCard : utilizes
    Badge ..> ProductCard : utilizes
    RatingStars ..> ProductCard : utilizes
    ProductCard ..> ProductGrid : composed in
    CategoryCard ..> CategoryShowcase : composed in
    QuantitySelector ..> CartItemRow : utilizes
    CartItemRow ..> CartDrawer : composed in
    Organisms ..> StorefrontLayout : embedded in
```

---

## 2. Sequence Diagram: Cart -> Checkout -> Razorpay Payment Gate (Modules 4 & 5)

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant UI as Storefront (Client App Router)
    participant Cart as CartCalculator (Pure Service)
    participant API as /api/payment/create-order
    participant Gateway as PaymentService (Razorpay Adapter)
    participant Verify as /api/payment/verify

    Customer->>UI: Add luxury product to bag
    UI->>Cart: CartCalculator.addItem(items, item)
    Cart-->>UI: return updated CartState & Totals
    Customer->>UI: Apply Coupon 'AAUROSHE10'
    UI->>Cart: CartCalculator.calculateTotals(items, "AAUROSHE10")
    Cart-->>UI: return discounted totals (10% off)
    Customer->>UI: Click 'Proceed to Checkout'
    UI->>API: POST /api/payment/create-order { amount, customerEmail }
    API->>Gateway: paymentService.createPaymentOrder()
    Gateway-->>API: { gatewayOrderId, amountInPaise, keyId }
    API-->>UI: return payment order metadata
    UI->>Customer: Display Razorpay Checkout Modal
    Customer->>Gateway: Authorize transaction (UPI/Card)
    Gateway-->>UI: Return razorpay_payment_id & signature
    UI->>Verify: POST /api/payment/verify { orderId, paymentId, signature }
    Verify->>Gateway: verifyPaymentSignature(payload) [HMAC-SHA256]
    Gateway-->>Verify: Signature valid (true)
    Verify-->>UI: { success: true, message: "Order Confirmed" }
    UI->>Customer: Render Order Confirmation & Invoice
```

---

## 3. Entity Relationship Diagram (PostgreSQL Data Model)

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS ||--o{ ADDRESSES : owns
    CATEGORIES ||--o{ PRODUCTS : contains
    CATEGORIES ||--o{ SUBCATEGORIES : has
    PRODUCTS ||--o{ PRODUCT_VARIANTS : has
    PRODUCTS ||--o{ PRODUCT_IMAGES : includes
    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS ||--|| PAYMENTS : settles
    PRODUCTS ||--o{ ORDER_ITEMS : ordered_as

    USERS {
        uuid id PK
        string email UK
        string full_name
        string role "CUSTOMER | ADMIN"
        timestamp created_at
    }
    CATEGORIES {
        uuid id PK
        string slug UK
        string name
        string tagline
        text description
        string image_url
        boolean featured
    }
    PRODUCTS {
        uuid id PK
        uuid category_id FK
        string slug UK
        string title
        string subtitle
        text description
        decimal base_price
        string badge
        decimal rating
        int review_count
        boolean is_featured
        boolean in_stock
    }
    PRODUCT_VARIANTS {
        uuid id PK
        uuid product_id FK
        string sku UK
        string name
        decimal price
        decimal original_price
        int stock_count
        json attributes
    }
    ORDERS {
        uuid id PK
        uuid user_id FK
        string order_number UK
        string customer_email
        json shipping_address
        decimal subtotal
        decimal discount_amount
        decimal shipping_cost
        decimal tax_amount
        decimal total_amount
        string status "PENDING | PAID | SHIPPED | DELIVERED"
        timestamp created_at
    }
    PAYMENTS {
        uuid id PK
        uuid order_id FK
        string provider "RAZORPAY"
        string razorpay_order_id
        string razorpay_payment_id
        decimal amount_paid
        string status "SUCCESS | FAILED"
        timestamp paid_at
    }
```
