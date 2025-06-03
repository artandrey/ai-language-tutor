'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useState } from 'react';

export default function AuthTestPage() {
  const {
    user,
    loading,
    error,
    signOut,
    createAnonymousSession,
    isAuthenticated,
    isAnonymous,
  } = useAuth();
  const [testResult, setTestResult] = useState<string>('');

  const handleCreateNewSession = async () => {
    try {
      await createAnonymousSession();
      setTestResult('New anonymous session created successfully');
    } catch (error) {
      setTestResult(
        `Failed to create session: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  };

  const testUserInfo = () => {
    if (!user) {
      setTestResult('No user found');
      return;
    }

    const userInfo = {
      id: user.id,
      email: user.email,
      isAnonymous: user.is_anonymous,
      createdAt: user.created_at,
      role: user.role,
      lastSignInAt: user.last_sign_in_at,
    };

    setTestResult(`User info: ${JSON.stringify(userInfo, null, 2)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Authentication Test Page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span>
                  Status:{' '}
                  {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                <span>Type: {isAnonymous ? 'Anonymous' : 'Registered'}</span>
              </div>

              {user && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                  <strong>User ID:</strong> {user.id}
                  <br />
                  <strong>Email:</strong> {user.email || 'N/A'}
                  <br />
                  <strong>Is Anonymous:</strong>{' '}
                  {user.is_anonymous ? 'Yes' : 'No'}
                  <br />
                  <strong>Created At:</strong> {user.created_at}
                  <br />
                  <strong>Last Sign In:</strong> {user.last_sign_in_at || 'N/A'}
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>

            <div className="space-y-4">
              <button
                onClick={handleCreateNewSession}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Create New Anonymous Session
              </button>

              <button
                onClick={testUserInfo}
                disabled={!user}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Test User Info
              </button>

              <button
                onClick={signOut}
                disabled={!user}
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
              {testResult}
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              When you first visit this page, an anonymous session should be
              created automatically
            </li>
            <li>Click "Test User Info" to verify user data is accessible</li>
            <li>
              Click "Create New Anonymous Session" to test manual session
              creation
            </li>
            <li>Click "Sign Out" to test the logout functionality</li>
            <li>Refresh the page to test automatic session restoration</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
