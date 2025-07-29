export function Button({ children, className, ...props }: { children: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={`bg-red-500 text-white py-2 px-4 rounded ${className}`} {...props}>{children}</button>;
  }