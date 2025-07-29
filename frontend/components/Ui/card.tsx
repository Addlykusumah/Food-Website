export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`rounded-xl border shadow-md p-4 ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
  }