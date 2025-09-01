// src/components/OurPromise.tsx
import Image from "next/image";



const OurPromise = ({promises}) => {
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
