import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain">
      <Header />
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}
