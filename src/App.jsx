import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Trajectory from "./components/Trajectory.jsx";
import Motorsports from "./components/Motorsports.jsx";
import Extracurriculars from "./components/Extracurriculars.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <div className="min-h-screen bg-void text-ghost">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Trajectory />
        <Motorsports />
        <Extracurriculars />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
