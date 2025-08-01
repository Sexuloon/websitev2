// src/components/OurPromise.tsx
import Image from "next/image";

const promises = [
  {
    icon: "/dd.png", // Place your icons in public/icons/
    title: "Discreet Delivery",
    description:
      "We deliver Surge right to your door with full privacy. Enjoy convenience without any awkwardness.",
  },
  {
    icon: "/ei.png",
    title: "Enhanced Intimacy",
    description:
      "Boost your confidence in the bedroom with our fast-acting formula, helping you last 5–7 times longer.",
  },
  {
    icon: "/quct.png",
    title: "Quality You Can Trust",
    description:
      "All our men’s wellness products are FDA-approved and rigorously tested for safety and effectiveness.",
  },
  {
    icon: "/ecs.png",
    title: "Support That Cares",
    description:
      "Experience industry-leading support from our team, ensuring confidential and reliable service at every stage.",
  },
];

const OurPromise = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-10">The Sexuloon Promise</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-4">
        {promises.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <Image
                src={item.icon}
                alt={item.title}
                width={64}
                height={64}
                className="mx-auto"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPromise;
