import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Header />
        <Outlet />
      </main>
      <footer className="p-6 text-center bg-card text-card-foreground mt-10 border-t border-border/40">
        Made with <span className="text-red-500">💗</span> by Tushar
      </footer>
    </div>
  );
};

export default AppLayout;
