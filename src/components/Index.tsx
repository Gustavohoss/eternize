// External Libraries
import "../App.css";

// Components
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import Footer from "./components/Footer"; // Importação corrigida
import Hero from "./components/Hero"; // Import default
import { Pricing } from "./components/Pricing";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ButtonWhats } from "./components/ButtonWhats";
import { Steps } from "./components/Steps";
import Testimonials from "./components/Testimonials"; // Import default

function App() {
  return (
    <>
      {/* Header Section */}
      <Navbar />
      <Hero />

      {/* Main Content */}
      <Steps />
      <About />
      <Pricing />
      <Features />
      <Testimonials />
      <Newsletter />
      <FAQ />

      {/* Footer Section */}
      <Footer />
      <ButtonWhats />
    </>
  );
}

export default App;
