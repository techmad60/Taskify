// /app/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="login-container min-h-screen flex flex-col justify-center items-center bg-white">
        {children}
      </div>
    );
  }
  