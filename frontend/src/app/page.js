// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-4xl font-bold mb-4 text-white">Countries Around the World</h1>
      <Link href="/countries">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-300">
            See Countries
          </button>
      </Link>
    </div>
  );
}
