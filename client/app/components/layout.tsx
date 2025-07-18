// File: components/LandingLayout.tsx
export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {children}
      </div>
    );
  }