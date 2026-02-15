import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div
      className="min-h-screen bg-[#080b14] text-white"
      style={{ isolation: "isolate" }} // ⭐ global layering safety
    >
      <div className="flex flex-col min-h-screen relative">

        {/* GLOBAL HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-grow relative z-0">
          <Component {...pageProps} />
        </main>

        {/* GLOBAL FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
