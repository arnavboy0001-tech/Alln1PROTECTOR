import { useState } from 'react';

type Page = 'home' | 'premium-buy' | 'premium-protect';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPremium, setIsPremium] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState('');
  const [premiumPhone, setPremiumPhone] = useState('');
  const [premiumName, setPremiumName] = useState('');
  const [premiumActivated, setPremiumActivated] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [selectedProtections, setSelectedProtections] = useState<string[]>([]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  const handleActivate = () => {
    if (phoneNumber.length === 10 && name.trim().length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsActivated(true);
      }, 3000);
    }
  };

  const handleRedeemCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
    setRedeemCode(value);
    setRedeemError('');
  };

  const handleRedeem = () => {
    if (redeemCode.length < 10) {
      setRedeemError('Please enter a valid redeem code');
      return;
    }
    setIsRedeeming(true);
    setRedeemError('');
    setTimeout(() => {
      setIsRedeeming(false);
      setIsPremium(true);
      setCurrentPage('premium-protect');
    }, 3500);
  };

  const toggleProtection = (type: string) => {
    setSelectedProtections(prev =>
      prev.includes(type) ? prev.filter(p => p !== type) : [...prev, type]
    );
  };

  const handlePremiumActivate = () => {
    if (premiumPhone.length === 10 && premiumName.trim().length > 0 && selectedProtections.length > 0) {
      setPremiumLoading(true);
      setTimeout(() => {
        setPremiumLoading(false);
        setPremiumActivated(true);
      }, 4000);
    }
  };

  const handlePremiumPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPremiumPhone(value);
  };

  // Premium Buy Page
  if (currentPage === 'premium-buy') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-amber-500/20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
                ALLn1PROTECTOR
              </span>
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </nav>

        <div className="pt-28 pb-16 px-4">
          <div className="max-w-lg mx-auto">
            {/* Premium Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm text-amber-300 font-medium">Premium Protector</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Unlock <span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">Premium</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Enter your Google Play redeem code to activate premium protection
              </p>
            </div>

            {/* Premium Card */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-amber-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-amber-500/5 mb-6">
              {/* Plan Details */}
              <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Plan</span>
                  <span className="text-amber-400 font-semibold">Premium Protector</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Duration</span>
                  <span className="text-white font-medium">1 Year Subscription</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Coverage</span>
                  <span className="text-white font-medium">SMS • OTP • WhatsApp • Calls</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Price</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">₹30</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {[
                  'Permanent protection from all bombers',
                  'SMS & OTP bombing blocked',
                  'WhatsApp spam protection',
                  'Phone call bombing shield',
                  '24/7 AI-powered monitoring',
                  'Priority support access',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Redeem Code Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Google Play Redeem Code</label>
                <input
                  type="text"
                  value={redeemCode}
                  onChange={handleRedeemCodeChange}
                  placeholder="Enter your redeem code"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono tracking-wider text-center text-lg uppercase"
                />
                {redeemError && (
                  <p className="text-red-400 text-xs mt-1.5 ml-1">{redeemError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1.5 ml-1">Format: XXXX-XXXX-XXXX or XXXXXXXXXXXX</p>
              </div>

              {/* Redeem Button */}
              <button
                onClick={handleRedeem}
                disabled={redeemCode.length < 10 || isRedeeming}
                className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  redeemCode.length >= 10 && !isRedeeming
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 cursor-pointer'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isRedeeming ? (
                  <>
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <span>Redeem & Activate Premium</span>
                  </>
                )}
              </button>

              {/* Redeeming Progress */}
              {isRedeeming && (
                <div className="mt-4 space-y-3">
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full animate-pulse" style={{ width: '65%' }}></div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm text-amber-400 animate-pulse">Validating redeem code with Google Play...</p>
                    <p className="text-xs text-gray-500">Processing ₹30 payment...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-3">Accepted via Google Play</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4"/>
                    <path d="M17.556 8.236L14.85 9.78l-1.058 2.22 1.058 2.22 2.706 1.544 3.035-1.726a.996.996 0 000-1.732l-3.035-1.726z" fill="#FBBC04"/>
                    <path d="M3.609 1.814L13.792 12l3.764-3.764L6.544.588a1.1 1 0 00-2.935 1.226z" fill="#34A853"/>
                    <path d="M13.792 12L3.609 22.186a1.1 1 0 002.935 1.226L17.556 15.764 13.792 12z" fill="#EA4335"/>
                  </svg>
                  <span className="text-xs text-gray-300">Google Play</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-gray-300">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    );
  }

  // Premium Protection Page
  if (currentPage === 'premium-protect') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-amber-500/20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
                ALLn1PROTECTOR
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-xs text-amber-300 font-medium">PREMIUM</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-28 pb-16 px-4">
          <div className="max-w-lg mx-auto">
            {/* Premium Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm text-amber-300 font-medium">Premium Active</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Premium <span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">Protection</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Shield your number from all types of bombing attacks permanently
              </p>
            </div>

            {!premiumActivated ? (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-amber-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-amber-500/5">
                <h2 className="text-xl font-bold mb-2 text-center">Activate Premium Shield</h2>
                <p className="text-gray-400 text-sm text-center mb-6">Select protection types and enter your details</p>

                {/* Protection Types */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Protection Types</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'sms', label: 'SMS Bombing', icon: '💬', desc: 'Block SMS floods' },
                      { id: 'otp', label: 'OTP Bombing', icon: '🔐', desc: 'Block OTP floods' },
                      { id: 'whatsapp', label: 'WhatsApp', icon: '📱', desc: 'Block WA spam' },
                      { id: 'calls', label: 'Phone Calls', icon: '📞', desc: 'Block call floods' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => toggleProtection(type.id)}
                        className={`p-3 rounded-xl border transition-all duration-300 text-left ${
                          selectedProtections.includes(type.id)
                            ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                            : 'bg-gray-700/30 border-gray-600/50 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className={`text-sm font-medium ${selectedProtections.includes(type.id) ? 'text-amber-300' : 'text-gray-300'}`}>
                          {type.label}
                        </div>
                        <div className="text-xs text-gray-500">{type.desc}</div>
                        {selectedProtections.includes(type.id) && (
                          <div className="mt-1.5 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs text-amber-400">Active</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-3">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-gray-300 text-sm font-medium">+91</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        value={premiumPhone}
                        onChange={handlePremiumPhoneChange}
                        placeholder="Enter 10-digit number"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        {premiumPhone.length}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={premiumName}
                    onChange={(e) => setPremiumName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
                  />
                </div>

                {/* Activate Button */}
                <button
                  onClick={handlePremiumActivate}
                  disabled={premiumPhone.length !== 10 || premiumName.trim().length === 0 || selectedProtections.length === 0 || premiumLoading}
                  className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    premiumPhone.length === 10 && premiumName.trim().length > 0 && selectedProtections.length > 0 && !premiumLoading
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 cursor-pointer'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {premiumLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Activating Premium Shield...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Activate Premium Protection</span>
                    </>
                  )}
                </button>

                {/* Loading Progress */}
                {premiumLoading && (
                  <div className="mt-4 space-y-3">
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm text-amber-400 animate-pulse">Setting up premium protection layers...</p>
                      <p className="text-xs text-gray-500">Configuring AI defense system...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Premium Success State */
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-amber-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-amber-500/5">
                <div className="text-center py-4 space-y-4">
                  <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto relative">
                    <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-ping"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-amber-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-400 mb-1">Premium Shield Activated!</h3>
                    <p className="text-gray-400 text-sm">Your number +91 {premiumPhone} is now fully protected</p>
                  </div>

                  {/* Protection Details */}
                  <div className="bg-gray-900/50 rounded-xl p-4 space-y-3 border border-gray-700/50 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status</span>
                      <span className="text-amber-400 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                        Premium Active
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Protection Level</span>
                      <span className="text-amber-400 font-medium">Maximum ⭐</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subscription</span>
                      <span className="text-amber-400 font-medium">1 Year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Expires</span>
                      <span className="text-amber-400 font-medium">{new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Monitoring</span>
                      <span className="text-amber-400 font-medium">24/7 AI Active</span>
                    </div>
                  </div>

                  {/* Active Protections */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 text-left">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Active Protections</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProtections.map((type) => {
                        const labels: Record<string, { label: string; icon: string }> = {
                          sms: { label: 'SMS Bombing', icon: '💬' },
                          otp: { label: 'OTP Bombing', icon: '🔐' },
                          whatsapp: { label: 'WhatsApp Spam', icon: '📱' },
                          calls: { label: 'Phone Calls', icon: '📞' },
                        };
                        const item = labels[type];
                        return (
                          <div key={type} className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                            <span>{item?.icon}</span>
                            <span className="text-xs text-amber-300">{item?.label}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-amber-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Threats Blocked Counter */}
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-1">Threats Blocked Since Activation</p>
                      <p className="text-3xl font-bold text-amber-400">0</p>
                      <p className="text-xs text-gray-500 mt-1">Real-time monitoring active</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    <span>Premium AI defense system active</span>
                  </div>
                </div>
              </div>
            )}

            {/* Back to Home */}
            <div className="text-center mt-6">
              <button
                onClick={() => setCurrentPage('home')}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-green-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              ALLn1PROTECTOR
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#protection" className="hover:text-green-400 transition-colors">Protection</a>
            <a href="#how-it-works" className="hover:text-green-400 transition-colors">How It Works</a>
            <a href="#tips" className="hover:text-green-400 transition-colors">Tips</a>
            <button
              onClick={() => setCurrentPage('premium-buy')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 hover:from-amber-500/30 hover:to-orange-500/30 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Buy Premium</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('premium-buy')}
              className="md:hidden flex items-center gap-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-3 py-1.5 text-amber-300 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Premium</span>
            </button>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">Active</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="protection" className="pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm text-green-300 font-medium">Protection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Shield Your <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Number</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Protect your phone from unwanted bombing attacks with our advanced security system
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span>Number protection list</span>
          </div>
        </div>
      </section>

      {/* Protection Form */}
      <section className="px-4 pb-16">
        <div className="max-w-lg mx-auto">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-green-500/5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Protect Your Number</h2>
              <p className="text-gray-400 text-sm">Enter your details to activate permanent protection against bombing attacks</p>
            </div>

            {!isActivated ? (
              <div className="space-y-5">
                {/* Phone Number Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-3">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-gray-300 text-sm font-medium">+91</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Enter 10-digit number"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        {phoneNumber.length}/10
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 ml-1">Indian numbers only</p>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                  />
                </div>

                {/* Activate Button */}
                <button
                  onClick={handleActivate}
                  disabled={phoneNumber.length !== 10 || name.trim().length === 0 || isLoading}
                  className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    phoneNumber.length === 10 && name.trim().length > 0 && !isLoading
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 cursor-pointer'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Activating Protection...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Activate Protection</span>
                    </>
                  )}
                </button>

                {/* Loading Progress */}
                {isLoading && (
                  <div className="space-y-3">
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm text-green-400 animate-pulse">Verifying your number...</p>
                      <p className="text-xs text-gray-500">Adding to protection database...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-400">Protection Activated!</h3>
                <p className="text-gray-400 text-sm">Your number +91 {phoneNumber} is now protected</p>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Protection Level</span>
                    <span className="text-green-400 font-medium">Standard</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-green-400 font-medium">Lifetime</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monitoring</span>
                    <span className="text-green-400 font-medium">24/7 Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>AI monitoring active</span>
                </div>

                {/* Premium Upgrade Banner */}
                <div className="mt-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-amber-300">Upgrade to Premium</p>
                      <p className="text-xs text-gray-400">Full protection for SMS, OTP, WhatsApp & Calls</p>
                    </div>
                    <button
                      onClick={() => setCurrentPage('premium-buy')}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all"
                    >
                      ₹30
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Premium Banner */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">Premium Protector — ₹30 Only</h3>
                <p className="text-gray-400 text-sm">Get complete protection against SMS, OTP, WhatsApp & Phone call bombing for 1 full year. Activate now with Google Play redeem code.</p>
              </div>
              <button
                onClick={() => setCurrentPage('premium-buy')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-2 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Get Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              How Our Protection <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-gray-400">Simple 4-step process to secure your number permanently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: 1,
                title: 'Instant Activation',
                desc: 'Protection starts immediately after verification',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                step: 2,
                title: 'Secure Database',
                desc: 'Number added to encrypted protection list',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                step: 3,
                title: 'Active Monitoring',
                desc: 'AI detects and blocks bombing attempts',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
              },
              {
                step: 4,
                title: 'Lifetime Protection',
                desc: 'Permanent security that never expires',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:border-green-500/30 transition-all duration-300 group cursor-pointer"
                onMouseEnter={() => setActiveStep(item.step)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                  activeStep === item.step
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-700/50 text-gray-400'
                }`}>
                  {item.icon}
                </div>
                <div className="absolute top-4 right-4 text-2xl font-bold text-gray-700 group-hover:text-green-500/30 transition-colors">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '99.9%', label: 'Success Rate', color: 'from-green-400 to-emerald-500' },
              { value: '<1s', label: 'Activation', color: 'from-blue-400 to-cyan-500' },
              { value: '24/7', label: 'Monitoring', color: 'from-purple-400 to-pink-500' },
              { value: '∞', label: 'Duration', color: 'from-amber-400 to-orange-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 text-center hover:border-green-500/20 transition-all">
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Protection Tips */}
      <section id="tips" className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Additional <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Protection Tips</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'National DND',
                desc: 'Register for Do Not Disturb service',
                action: 'SMS "DND" to 1909',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
              },
              {
                title: 'Blocking Apps',
                desc: 'Use trusted call-blocking applications',
                action: 'Truecaller • Google Phone',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: 'Phone Settings',
                desc: 'Enable built-in spam protection',
                action: 'Settings → Phone',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: 'Privacy Guard',
                desc: 'Limit sharing your number online',
                action: 'Use email instead',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
            ].map((tip, i) => (
              <div key={i} className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:border-green-500/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 shrink-0 group-hover:bg-green-500/20 transition-colors">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{tip.desc}</p>
                    <div className="inline-flex items-center gap-1.5 bg-gray-700/50 rounded-md px-2.5 py-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="text-xs text-gray-300">{tip.action}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              ALLn1PROTECTOR
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-4">Advanced phone number protection system</p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <span>© 2025 ALLn1PROTECTOR</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}
