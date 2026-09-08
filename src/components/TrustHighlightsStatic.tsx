"use client";

export default function TrustHighlightsStatic() {
  return (
    <section className="bg-gradient-to-b from-white via-orange-50/30 to-white border-b border-orange-100 py-10 sm:py-14 text-slate-800 relative z-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white border border-orange-100/80 shadow-xl shadow-orange-500/5 rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-orange-100 p-4 sm:p-6 lg:p-8">
          
          {/* Trust Element 1 */}
          <div className="flex flex-col items-center text-center p-3 sm:p-2 group transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 mb-2 sm:mb-3 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300 shadow-sm">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-xs sm:text-sm tracking-wide">Custom Experiences</h3>
            <p className="text-slate-600 text-[11px] sm:text-xs mt-1">Tailor-made trips for you</p>
          </div>

          {/* Trust Element 2 */}
          <div className="flex flex-col items-center text-center p-3 sm:p-2 group transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 border border-teal-500/20 mb-2 sm:mb-3 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300 shadow-sm">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-xs sm:text-sm tracking-wide">Community Travel</h3>
            <p className="text-slate-600 text-[11px] sm:text-xs mt-1">Travel with like-minded explorers</p>
          </div>

          {/* Trust Element 3 */}
          <div className="flex flex-col items-center text-center p-3 sm:p-2 group transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20 mb-2 sm:mb-3 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300 shadow-sm">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.957 11.957 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-xs sm:text-sm tracking-wide">Safe &amp; Trusted</h3>
            <p className="text-slate-600 text-[11px] sm:text-xs mt-1">Your safety is our priority</p>
          </div>

          {/* Trust Element 4 */}
          <div className="flex flex-col items-center text-center p-3 sm:p-2 group transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 border border-sky-500/20 mb-2 sm:mb-3 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all duration-300 shadow-sm">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-xs sm:text-sm tracking-wide">24/7 Support</h3>
            <p className="text-slate-600 text-[11px] sm:text-xs mt-1">We're here anytime you need</p>
          </div>

        </div>
      </div>
    </section>
  );
}
