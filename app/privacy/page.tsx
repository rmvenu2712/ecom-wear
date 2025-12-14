export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-500">Last updated: January 2025</p>

          <h2 className="mb-4 mt-8 text-2xl font-bold">Introduction</h2>
          <p className="leading-relaxed text-gray-600">
            At StyleMart, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or make a purchase from us.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-bold">Information We Collect</h2>
          <p className="leading-relaxed text-gray-600">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Name, email address, and phone number</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Order history and preferences</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-bold">How We Use Your Information</h2>
          <p className="leading-relaxed text-gray-600">We use the information we collect to:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and shipping updates</li>
            <li>Respond to your questions and provide customer support</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and enhance security</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-bold">Information Sharing</h2>
          <p className="leading-relaxed text-gray-600">
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Service providers who help us operate our business</li>
            <li>Payment processors to handle transactions</li>
            <li>Shipping companies to deliver your orders</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-bold">Data Security</h2>
          <p className="leading-relaxed text-gray-600">
            We implement appropriate security measures to protect your personal information. However, no method of
            transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-bold">Your Rights</h2>
          <p className="leading-relaxed text-gray-600">You have the right to:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-bold">Contact Us</h2>
          <p className="leading-relaxed text-gray-600">
            If you have questions about this Privacy Policy, please contact us at privacy@stylemart.com.
          </p>
        </div>
      </div>
    </div>
  )
}
