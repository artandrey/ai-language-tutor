import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1837] to-[#1a1037] p-4">
      <div className="bg-white/10 rounded-xl p-8 max-w-2xl w-full text-white">
        <h1 className="text-2xl font-bold mb-4">Terms of Use</h1>
        <p className="mb-4">Last updated: June 2024</p>
        <p className="mb-4">
          Swiftly is a study and demonstration project. The app and its features
          are provided for educational purposes only. No real payments are
          processed, and no actual tutoring or subscription services are
          available. By using this site, you acknowledge that all content,
          pricing, and features are for demonstration only and do not constitute
          a real offer or contract.
        </p>
        <p className="mb-4">
          For questions, contact:{' '}
          <a
            href="mailto:info@swiftly.ai"
            className="underline text-blue-300"
          >
            info@swiftly.ai
          </a>
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">
          1. Use of the Service
        </h2>
        <p className="mb-4">
          You may use Swiftly solely for personal, non-commercial, educational
          purposes. You may not use the app for any unlawful or prohibited
          purpose.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">
          2. No Real Payment or Service
        </h2>
        <p className="mb-4">
          No real payments are processed and no actual services are provided.
          Any payment flows, features, or content are for demonstration only.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">
          3. Intellectual Property
        </h2>
        <p className="mb-4">
          All content, trademarks, and materials on Swiftly are the property of
          their respective owners and may not be used without permission.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">
          4. Limitation of Liability
        </h2>
        <p className="mb-4">
          Swiftly is provided "as is" without warranties of any kind. We are not
          liable for any damages or losses arising from your use of the app.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">5. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms at any time. Continued use of Swiftly means
          you accept the revised Terms.
        </p>
      </div>
    </div>
  );
}
