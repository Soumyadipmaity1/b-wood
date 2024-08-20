import Recommended from "../components/Landing/Recommended/Recomendation";
import WhyChooseSection from "../components/Landing/WhyChoose";
import Slider from "../components/Landing/Slider";
export default function Home() {
  return (
    <main className="w-full lg:px-10">

      <Slider />
      <WhyChooseSection />

      <div className="p-6">
        <h1 className="text-3xl text-neon font-bold mb-6 m-2">Recommended</h1>
        <Recommended />
      </div>

      <div className="p-6">
        <h1 className="text-3xl text-neon font-bold mb-6 m-2">To be Watched</h1>
        <Recommended />
      </div>

      <div className="p-6">
        <h1 className="text-3xl text-neon font-bold mb-6 m-2">Upcoming</h1>
        <Recommended />
      </div>
    </main>
  );
}
