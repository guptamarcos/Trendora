import { about_img } from "../../assets/Index";

function AboutContent() {
  return (
    <section className="flex mt-8 mb-12">
      <img
        src={about_img}
        alt="About Trendora"
        className="w-[50%] h-[75vh] rounded-lg object-cover"
      />

      <div className="flex-1 p-16 text-justify text-gray-600">
        <p>
          Trendora was born out of a passion for innovation and a desire to
          revolutionize the way people shop online...
        </p>

        <br />

        <p>
          Since our inception, we've worked tirelessly to curate a diverse
          selection of high-quality products...
        </p>

        <br />

        <h3 className="font-semibold text-gray-700">
          Our Mission
        </h3>

        <br />

        <p>
          Our mission at Trendora is to empower customers with choice,
          convenience, and confidence...
        </p>
      </div>
    </section>
  );
}

export default AboutContent;