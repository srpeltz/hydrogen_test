import {
  // The `useShopQuery` hook makes server-only GraphQL queries to the Storefront API.
  useShopQuery,
  // The `flattenConnection` utility takes Shopify storefront relay data
  // and transforms it into a flat array of objects.
  flattenConnection
} from '@shopify/hydrogen';
// Import the `Layout` component that defines the structure of the page.
import Layout from '../components/Layout.server';
// Import the `ProductList` component that defines the products to display.
import ProductList from '../components/ProductList';
// Import `gql` to parse GraphQL queries.
import gql from 'graphql-tag';

// Fetch product data from your storefront by passing in a GraphQL query to the
// `useShopQuery` server component.
export default function Index() {
  const {data} = useShopQuery({
    query: QUERY,
  });

  // Transform Shopify storefront relay data into
  // a flat array of objects.
  const products = flattenConnection(data.products);
  // Return a list of products.
  return (
    <Layout>
      <ProductList products={products} />
    </Layout>
  );
}

// Define the GraphQL query.
const QUERY = gql`
  query HomeQuery {
    products(first: 10) {
      edges {
        node {
          handle
          id
          media(first: 10) {
            edges {
              node {
                ... on MediaImage {
                  mediaContentType
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
          metafields(first: 3) {
            edges {
              node {
                id
                type
                namespace
                key
                value
                createdAt
                updatedAt
                description
                reference {
                  __typename
                  ... on MediaImage {
                    id
                    mediaContentType
                    image {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
          priceRange {
            maxVariantPrice {
              currencyCode
              amount
            }
            minVariantPrice {
              currencyCode
              amount
            }
          }
          title
          variants(first: 250) {
            edges {
              node {
                id
                title
                availableForSale
                image {
                  id
                  url
                  altText
                  width
                  height
                }
                priceV2 {
                  currencyCode
                  amount
                }
                compareAtPriceV2 {
                  currencyCode
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`
