import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1837] to-[#1a1037] p-4">
      <div className="bg-white/10 rounded-xl p-8 max-w-2xl w-full text-white">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Last updated: June 2024</p>
        <p className="mb-4">
          Swiftly is a study and demonstration project. The app does not
          collect, store, or process personal data for commercial purposes. Any
          information entered is used solely for demonstration and is not shared
          with third parties. No real payments or user accounts are created.
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
          1. Information Collection
        </h2>
        <p className="mb-4">
          We do not collect personal information for commercial use. Any data
          entered is for demo purposes only and is not retained.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">
          2. Use of Information
        </h2>
        <p className="mb-4">
          Any information you provide is used solely to demonstrate app features
          and is not shared or sold.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">3. Data Security</h2>
        <p className="mb-4">
          We take reasonable steps to protect any information entered, but as
          this is a demo, no guarantees are made regarding data security.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2">
          4. Changes to Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy at any time. Continued use of
          Swiftly means you accept the revised policy.
        </p>
      </div>
    </div>
  );
}
