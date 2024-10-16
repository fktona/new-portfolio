import Hero from "./components/section/hero";
import MyStack from "./components/section/stack";
import About from "./components/section/about";
import Project from "./components/section/project";
import Footer from "./components/section/footer";
import Contact from "./components/section/contact";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <MyStack />
      <About />
      <Project />
      <Footer />
      <Contact />
    </div>
  );
}
