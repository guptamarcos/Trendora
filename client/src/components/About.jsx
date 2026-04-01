import { Subscribe } from "./Index.jsx";
import { about_img } from "../assets/Index.jsx";

function About() {
  return (
    <main>

      {/*ABOUT US HEADING  */}
      <h6 className="mt-8 flex justify-center items-center">
        <p className="text-2xl text-gray-600">
          ABOUT&nbsp;<b className="text-black">US</b>
        </p>{" "}
        &nbsp; &nbsp;
        <hr className="w-[5%] border-t-2 border-gray-500" />
      </h6>
      
      {/* IMAGE AND CONTENT */}
      <div className="flex my-16">
        <img src={about_img} className="w-[50%] h-[80vh] "></img>
        <p className="flex-1 p-16 text-justify text-gray-600">
          Trendora was born out of a passion for innovation and a desire to
          revolutionize the way people shop online. Our journey began with a
          simple idea: to provide a platform where customers can easily
          discover, explore, and purchase a wide range of products from the
          comfort of their homes. 
          <br/> <br/> 
          Since our inception, we've worked tirelessly
          to curate a diverse selection of high-quality products that cater to
          every taste and preference. From fashion and beauty to electronics and
          home essentials, we offer an extensive collection sourced from trusted
          brands and suppliers. 
          <br/> <br/>
          <b className="text-gray-600">Our Mission</b>
          <br/> <br/>
          Our mission at Trendora is to empower
          customers with choice, convenience, and confidence. We're dedicated to
          providing a seamless shopping experience that exceeds expectations,
          from browsing and ordering to delivery and beyond.
        </p>
      </div>

      {/*CHOOSE US  */}
      <h6 className="flex items-center mb-10">
        <p className="text-2xl text-gray-600">
          WHY <b className="text-black">CHOOSE US</b>{" "}
        </p>{" "}
        &nbsp; &nbsp;
        <hr className="w-[5%] border-t-2 border-gray-500" />
      </h6>
      <div className="border-2 border-gray-400 flex mb-16">
        <div className="flex-1 p-12">
          <h6 className="font-semibold">QUALITY ASSURANCE</h6>
          <p className="text-gray-500 mt-4">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="flex-1 p-12 border-l-2 border-r-2 border-gray-400">
          <h6 className="font-semibold">CONVENIENCE: </h6>
          <p className="text-gray-500 mt-4">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="flex-1 p-12">
          <h6 className="font-semibold">EXCEPTIONAL CUSTOMER SERVICE:</h6>
          <p className="text-gray-500 mt-4">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/*SUBSCRIBE SECTION */}
      <Subscribe />
    </main>
  );
}

export default About;
