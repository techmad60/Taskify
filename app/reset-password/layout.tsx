// /app/login/layout.tsx
export default function ResetLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="reset-container min-h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    );
  }
  