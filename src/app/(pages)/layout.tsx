export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col pt-12 md:pt-16">{children}</div>;
}
