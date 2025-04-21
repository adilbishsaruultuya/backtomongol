// "use client";
// import { useData } from "@/common/provider/DataProvider";
// export default function Home() {
//   const { articles, categories, loading } = useData();
//   console.log(loading, articles);
//   return loading ? (
//     <div>Loading...</div>
//   ) : (
//     <div>{articles && articles[0].title.mn}</div>
//   );
// }

"use client";

import { motion } from "framer-motion";
// import Navbar from "@/components/Navbar";
// import Hero from "@/sections/Hero";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Activities from "@/app/components/sections/Activities";
import Documents from "@/app/components/sections/Documents";
import Donation from "@/app/components/sections/Donation";
import Partners from "@/app/components/sections/Partners";
import Events from "@/app/components/sections/Events";
import News from "@/app/components/sections/News";
import Members from "@/app/components/sections/Members";
// import Activities from "@/sections/Activities";
// import Documents from "@/sections/Documents";
// import Donation from "@/sections/Donation";
// import Partners from "@/sections/Partners";
// import Events from "@/sections/Events";
// import News from "@/sections/News";
// import Members from "@/sections/Members";

export default function HomePage() {
  return (
    <main className="scroll-smooth">
      {/* <Navbar /> */}
      <Hero />
      <About />
      <Activities />
      <Documents />
      <Donation />
      <Partners />
      <Events />
      <News />
      <Members />
    </main>
  );
}
