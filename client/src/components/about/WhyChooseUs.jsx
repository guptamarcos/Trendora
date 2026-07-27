const features = [
  {
    title: "QUALITY ASSURANCE",
    description:
      "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
  },
  {
    title: "CONVENIENCE",
    description:
      "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
  },
  {
    title: "EXCEPTIONAL CUSTOMER SERVICE",
    description:
      "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.",
  },
];

function FeatureCard({ title, description }) {
  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-12 border-2 border-gray-400">
      <h3 className="font-semibold">{title}</h3>

      <p className="text-gray-500 mt-4">{description}</p>
    </div>
  );
}

function WhyChooseUs() {
  return (
    <>
      <h2 className="flex items-center mb-10">
        <p className="text-2xl sm:text-3xl text-gray-600">
          WHY <b className="text-black">CHOOSE US</b>
        </p>

        <hr className="w-12 sm:w-[5%] border-t-2 border-gray-500 ml-4" />
      </h2>

      <section className="border-2 border-gray-400 flex flex-col lg:flex-row mb-16">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </>
  );
}

export default WhyChooseUs;