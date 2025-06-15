'use client';

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center space-y-8">
        {/* Modern Cube Animation */}
        <div className="relative w-16 h-16 animate-spin-slow">
          <div className="w-full h-full border-4 border-white rounded-[6px] shadow-xl transform rotate-45 animate-pulse" />
        </div>

        {/* Stylish Text */}
        <p className="text-xl font-semibold tracking-widest uppercase animate-fade-in-slow">
          Loading...
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }

        @keyframes fade-in-slow {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-slow {
          animation: fade-in-slow 1.2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
