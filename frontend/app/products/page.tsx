import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Shop Our Collection
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Discover our curated selection of premium products
        </p>
        <ProductList />
      </div>
    </div>
  );
}
