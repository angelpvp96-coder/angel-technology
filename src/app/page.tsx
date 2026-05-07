import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Sistema } from "@/components/sections/Sistema";
import { Filosofia } from "@/components/sections/Filosofia";
import { Casos } from "@/components/sections/Casos";
import { Paquetes } from "@/components/sections/Paquetes";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Sistema />
        <Filosofia />
        <Casos />
        <Paquetes />
      </main>
      <Footer />
    </>
  );
}
