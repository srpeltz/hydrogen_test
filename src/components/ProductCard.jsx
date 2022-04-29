// Import client components that need to be accessible to the `ProductCard` component.
import {
  ProductPrice,
  ProductProvider,
  ProductTitle,
  Link,
  //Image,
  // Hydrogen provides a special `@shopify/hydrogen/client` module to reference
  // components that are safe to use within client components. You should use
  // this import path when writing your client components.
} from '@shopify/hydrogen/client';

// The `ProductCard` component accepts `products` as a prop.
export default function ProductCard({product}) {
  // The product card displays the first product variant.
  const firstVariant = product.variants?.edges[0]?.node;

  // Return the first variant of the product. The product card
  // links to a product details page (specified by the product handle)
  // and displays the product's image, title, and price of the first variant.
  return (
    <ProductProvider data={product} initialVariantId={firstVariant.id}>
      <div className="mb-6">
        <Link to={`/products/${product.handle}`}>
          {/* <Image className="mb-3" data={firstVariant.image} /> */}
          <ProductTitle className="py-2 font-medium" />
          <ProductPrice className="text-gray-600" />
        </Link>
      </div>
    </ProductProvider>
  );
}
