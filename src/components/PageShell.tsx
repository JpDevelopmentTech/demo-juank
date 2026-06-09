import Sidebar from "@/components/Sidebar";
import TimeFilter from "@/components/TimeFilter";

export default function PageShell({
  title,
  children,
  noScroll = false,
}: {
  title: string;
  children: React.ReactNode;
  noScroll?: boolean;
}) {
  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-0 h-screen overflow-hidden">
        <header className="h-16 shrink-0 flex items-center justify-between pl-5 pr-8 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          <TimeFilter />
        </header>
        <div
          className={`flex-1 min-h-0 pl-5 pr-8 ${
            noScroll
              ? "py-5 space-y-5 overflow-hidden flex flex-col"
              : "py-8 space-y-8 overflow-y-auto [scrollbar-gutter:stable]"
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
