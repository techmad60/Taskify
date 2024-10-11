// /app/signup/layout.tsx
export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="signup-container min-h-screen flex flex-col  bg-color-zero">
        {children}
      </div>
    );
  }
  