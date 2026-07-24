import { Hero,BestSeller, LatestCollections,Policy } from "../components/home/Index.jsx";
import { Subscribe } from "../components/Index.jsx";

function Home() {
  return (
    <main className="min-h-screen">
      <Hero/>
      <LatestCollections/>
      <BestSeller/>
      <Policy/>
      <Subscribe/>
    </main>
  );
}

export default Home;
