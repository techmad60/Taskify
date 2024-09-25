// /app/main-page/layout.tsx

export default function MainPageLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="welcome-container min-h-screen flex flex-col bg-color-zero">
        {children}
      </div>
    );
  }
  