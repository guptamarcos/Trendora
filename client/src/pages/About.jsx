import {
  AboutHeader,
  AboutContent,
  WhyChooseUs,
} from "../components/about/Index.jsx";
import { Subscribe } from "../components/Index.jsx";

function About() {
  return (
    <main>
      <AboutHeader />
      <AboutContent />
      <WhyChooseUs />
      <Subscribe />
    </main>
  );
}

export default About;
