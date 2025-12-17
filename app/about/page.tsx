export default function AboutPage() {
  return (
    <div className="bg-white overflow-hidden animate-in fade-in duration-500">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold animate-in slide-in-from-top duration-500">About Us</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed text-gray-600 animate-in slide-in-from-left duration-500 delay-100">
            Welcome to StyleMart, your premier destination for fashion that fits every lifestyle. Since our founding,
            we've been committed to bringing you the latest trends and timeless classics at prices that make style
            accessible to everyone.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-bold animate-in slide-in-from-right duration-500 delay-200">
            Our Story
          </h2>
          <p className="leading-relaxed text-gray-600 animate-in slide-in-from-left duration-500 delay-300">
            StyleMart was born from a simple idea: fashion should be fun, affordable, and accessible to everyone. We
            started with a small collection and a big dream, and today we're proud to serve customers across the country
            with our carefully curated selection of clothing and accessories.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-bold animate-in slide-in-from-right duration-500 delay-400">
            Our Mission
          </h2>
          <p className="leading-relaxed text-gray-600 animate-in slide-in-from-left duration-500 delay-500">
            We believe in making quality fashion accessible to all. Our mission is to provide you with the best shopping
            experience, from browsing to delivery, while maintaining the highest standards of quality and customer
            service.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-bold animate-in slide-in-from-right duration-500 delay-600">
            Why Choose Us?
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-600 animate-in slide-in-from-left duration-500 delay-700">
            <li>Curated collections for men, women, and kids</li>
            <li>Quality products at competitive prices</li>
            <li>Fast and reliable shipping</li>
            <li>Easy returns and exchanges</li>
            <li>Secure payment options</li>
            <li>Excellent customer support</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-bold animate-in slide-in-from-right duration-500 delay-800">
            Contact Us
          </h2>
          <p className="leading-relaxed text-gray-600 animate-in slide-in-from-left duration-500 delay-900">
            Have questions? We're here to help! Reach out to us at support@stylemart.com or call us at 1800-123-4567.
            Our customer service team is available Monday through Saturday, 9 AM to 6 PM.
          </p>
        </div>
      </div>
    </div>
  )
}
