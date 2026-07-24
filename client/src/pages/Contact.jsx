import { Subscribe } from "../components/Index.jsx";
import SectionHeading from "../components/contact/SectionHeading.jsx";
import ContactContent from "../components/contact/ContactContent.jsx";

function Contact() {
  return (
    <main>
      <SectionHeading/>
      <ContactContent />
      <Subscribe />
    </main>
  );
}

export default Contact;