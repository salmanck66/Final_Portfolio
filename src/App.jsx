import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";

export default function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Portfolio/>
      <Experience/>
      <About/>
      <Contact/>
      <Footer/>
    </>
  )
}