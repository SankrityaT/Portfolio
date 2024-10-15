import React from "react";
import Navbar from "../app/navbar/page";
import Hero from "../app/hero/page";
import About from "../app/about/page";
import Portfolio from "../app/projects/page";
import Skills from "../app/skills/page";
import Contact from "../app/contact/page";
import Footer from "../app/footer/page";

export default function Home() {
  return (
    <div
      className="relative mt-2 py-4"
      style={{
        backgroundImage: "linear-gradient(135deg, #0061ff 0%, #ff1b6b 50%, #ff930f 100%)",
        backgroundSize: "400% 400%",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        color: "white",
      }}
    >
     <Navbar />

      <section id="home" className="content mt-0 md:mt-20 mx-4 md:mx-16 lg:mx-44 my-10 md:my-20 space-y-10 p-8">
        <Hero />
      </section>

      <section id="about" className="content mx-4 md:mx-16 lg:mx-44 my-10 md:my-20 space-y-10">
        <About />
      </section>

      <section id="portfolio" className="content mx-4 md:mx-16 lg:mx-44 my-10 md:my-20 space-y-10">
        <Portfolio />
      </section>

      <section id="skills" className="content mx-4 md:mx-16 lg:mx-44 my-10 md:my-20 space-y-10">
        <Skills />
      </section>

      <section id="contact" className="content mx-4 md:mx-16 lg:mx-44 my-10 md:my-20 space-y-10">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}
