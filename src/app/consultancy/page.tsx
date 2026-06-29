import { ArrowRight, Sparkles, ShieldCheck, Clock, Activity } from "lucide-react";
import Link from 'next/link';

export default function ConsultancyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-blue-200/40 to-transparent rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-indigo-200/40 to-transparent rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
      
      {/* Abstract medical cross pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwIDBoMnY0MGgtMnpNMCAyMGg0MHYyaC00MHoiIGZpbGw9IiNlN2U1ZTQiIGZpbGwtb3BhY2l0eT0iMC40IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-[0.15] pointer-events-none mask-image-linear-gradient"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex-grow flex flex-col justify-center py-20 lg:py-32 z-10">
        
        <div className="max-w-4xl mx-auto text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-md border border-gray-200/80 rounded-full px-5 py-2 shadow-sm animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide text-gray-700 uppercase">Coming Soon</span>
          </div>

          {/* Main Typography */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              The Future of <br/>
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 pb-2">
                Men&apos;s Healthcare
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0 blur-sm rounded-full"></div>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              We are building a highly discreet, secure, and personalized telehealth platform. Elite medical specialists, directly to you.
            </p>
          </div>

          {/* CTA / Waitlist */}
          <div className="pt-8 pb-12 flex flex-col items-center">
            <Link href="/joinus" className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-gray-900 border border-transparent rounded-full hover:bg-gray-800 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1 overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-300" />
                Join The Exclusive Waitlist
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <p className="mt-4 text-sm font-medium text-gray-400">Limited early access spots available.</p>
          </div>

          {/* Premium Feature Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-200/60 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            
            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Confidential</h3>
              <p className="text-sm text-gray-500 text-center">Enterprise-grade security for your medical data.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 md:-translate-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Top Specialists</h3>
              <p className="text-sm text-gray-500 text-center">Consult with board-certified urologists and experts.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Zero Wait Time</h3>
              <p className="text-sm text-gray-500 text-center">Instant access to care from the comfort of your home.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
