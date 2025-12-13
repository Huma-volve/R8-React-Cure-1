import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        
      </header>

      
      <main className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-16">
          
            <button
              onClick={() => window.history.back()}
              className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>

       
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Privacy Policy
            </h1>

          
            <div className="absolute right-4 w-10 h-10" />
          </div>
        </div>
       
        <section className="rounded-2xl p-6 sm:p-8 mb-6">
          <p className="text-sm text-gray-500 text-start mb-3">
            Last Updated: 19/11/2024
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            Welcome to Cure. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our doctor appointment booking app.
          </p>
        </section>

        {/* Terms & Conditions */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h2>

          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-8">
            By registering, accessing, or using this app, you confirm that you are at least 18 years old (or have parental/guardian consent if younger) and agree to be bound by these Terms and our Privacy Policy.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">You agree to:</h3>
              <ul className="space-y-3 text-gray-700 list-disc list-inside text-base sm:text-lg">
                <li>Use the app only for lawful purposes.</li>
                <li>Provide accurate and complete information during registration and booking.</li>
                <li>Not impersonate others or create fake accounts.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">You may not:</h3>
              <ul className="space-y-3 text-gray-700 list-disc list-inside text-base sm:text-lg">
                <li>Disrupt or interfere with the app’s functionality.</li>
                <li>Try to access data or systems not meant for you.</li>
                <li>Use the app to harass or abuse doctors or staff.</li>
              </ul>
            </div>
          </div>

          <p className="mt-8 text-gray-700 leading-relaxed text-base sm:text-lg">
            Your data is handled in accordance with our Privacy Policy. You are responsible for keeping your login credentials secure.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
