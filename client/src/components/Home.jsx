import { Hero,BestSeller, LatestCollections,Policy, Subscribe } from "./Index.jsx";

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
