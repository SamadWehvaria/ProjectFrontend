import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 lg:pt-28">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Breaking Language Barriers</span>
              <span className="block text-blue-600">in Healthcare</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Real-time translation powered by AI, enabling seamless communication between healthcare providers and patients in over 8 languages.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/auth?register=true">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/#how-it-works">
                  <Button variant="outline" size="lg">How It Works</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features that Make a Difference
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need for clear communication in healthcare settings.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Voice to Text */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Voice-to-Text</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Instantly convert spoken words into text with advanced AI recognition, optimized for medical terminology.
                    </p>
                  </div>
                </div>
              </div>

              {/* Real-time Translation */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Real-time Translation</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Seamless translation between 8+ languages, powered by advanced AI for medical accuracy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Audio Playback */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Audio Playback</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Natural-sounding voice output in multiple languages for clear pronunciation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Three simple steps to break down language barriers
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  1
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Speak or Type</h3>
                <p className="mt-2 text-base text-gray-500">
                  Start speaking or typing in your preferred language
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  2
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">AI Translation</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our AI instantly translates your message
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  3
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Communicate</h3>
                <p className="mt-2 text-base text-gray-500">
                  Read or listen to the translated message
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted in Healthcare
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Secure, compliant, and reliable translation services
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex justify-center items-center">
              <div className="p-4">
                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500 text-center">HIPAA Compliant</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="p-4">
                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500 text-center">End-to-End Encrypted</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="p-4">
                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500 text-center">99.9% Uptime</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="p-4">
                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500 text-center">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/#features" className="text-base text-gray-500 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-base text-gray-500 hover:text-gray-900">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2024 HealthTranslate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}