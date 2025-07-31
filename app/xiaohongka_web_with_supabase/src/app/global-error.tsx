'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">应用出错了</h2>
        <p className="text-gray-600 mb-6">
          抱歉，应用遇到了一个错误。我们已经记录了这个问题，请稍后再试。
        </p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mr-4"
        >
          重试
        </button>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}