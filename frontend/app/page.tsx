import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section - Dark Theme */}
      <section className="bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-950 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Elevate Your <span className="text-indigo-400">Lifestyle</span> With Premium Products
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Curated selection of high-quality essentials designed to enhance your everyday experience. Discover what makes us different.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-md bg-indigo-600 hover:bg-indigo-700 transition-all">
                  <Link href="/products">Discover Products</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-md border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-950">
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[
                    "bg-indigo-600",
                    "bg-purple-600",
                    "bg-pink-600",
                    "bg-blue-600"
                  ].map((bg, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-gray-900`}></div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">500+ Happy Customers</span>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-yellow-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-400 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative overflow-hidden rounded-lg shadow-2xl shadow-indigo-900/20">
                <div className="aspect-[4/3] relative">
                  <Image 
                    src="/api/placeholder/800/600" 
                    alt="Featured products" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold">Spring Collection</p>
                      <p className="text-white/80 text-sm">New Arrivals</p>
                    </div>
                    <Button size="sm" variant="secondary" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                      View
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-indigo-900 p-4 rounded-lg shadow-xl rotate-3 border border-indigo-700">
                <div className="text-sm font-medium">
                  <p className="text-indigo-300">25% OFF</p>
                  <p className="text-xs text-gray-400">First Order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Dark Theme */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold">Shop by Categories</h2>
              <p className="text-gray-400 mt-2">Find exactly what you need</p>
            </div>
            <Link 
              href="/products" 
              className="mt-4 md:mt-0 text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
            >
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "Electronics", icon: "📱", color: "bg-blue-900/50 border-blue-700", textColor: "text-blue-400" },
              { name: "Fashion", icon: "👕", color: "bg-pink-900/50 border-pink-700", textColor: "text-pink-400" },
              { name: "Home & Garden", icon: "🏡", color: "bg-green-900/50 border-green-700", textColor: "text-green-400" },
              { name: "Beauty", icon: "✨", color: "bg-purple-900/50 border-purple-700", textColor: "text-purple-400" }
            ].map((category) => (
              <Link 
                href={`/products?category=${category.name.toLowerCase()}`} 
                key={category.name}
                className="group block p-6 rounded-xl border border-gray-800 hover:border-gray-700 hover:shadow-lg transition-all bg-gray-800/50"
              >
                <div className={`${category.color} w-16 h-16 rounded-xl border flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className={`font-medium text-lg ${category.textColor}`}>{category.name}</h3>
                <p className="text-gray-400 text-sm mt-1">Explore products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Dark Theme */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium mb-4">Top Picks</span>
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our most popular products, handpicked for quality and design excellence
            </p>
          </div>
          
          <div className="w-full">
            <ProductList />
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="rounded-md border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-950">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Dark Theme */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium mb-4">Testimonials</span>
            <h2 className="text-3xl font-bold mb-4">Loved by Customers</h2>
            <p className="text-gray-400">
              See what our customers have to say about their shopping experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Regular Customer",
                text: "The quality of products exceeded my expectations. Fast shipping and excellent customer service!",
                rating: 5,
                image: "/api/placeholder/100/100"
              },
              {
                name: "Mark Wilson",
                role: "Premium Member",
                text: "I've been shopping here for months and have never been disappointed. Great selection and prices.",
                rating: 5,
                image: "/api/placeholder/100/100"
              },
              {
                name: "Aisha Patel",
                role: "New Customer",
                text: "Love the variety of products available. My order arrived well-packaged and exactly as described.",
                rating: 4,
                image: "/api/placeholder/100/100"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-700">
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-700">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section - Dark Theme */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-black/20 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-indigo-800/30">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
                <p className="mb-0 text-gray-300">
                  Subscribe to our newsletter for exclusive deals and new product launches
                </p>
              </div>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-lg text-gray-100 w-full flex-grow bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
                />
                <Button 
                  type="submit" 
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </Button>
              </form>
              
              <p className="text-xs text-center mt-4 text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}