// /app/login/layout.tsx
export default function WecomeLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="welcome-container min-h-screen flex flex-col justify-center items-center bg-color-zero">
        {children}
      </div>
    );
  }
  