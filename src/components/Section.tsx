type CardVariant = "default" | "bordered" | "gradient" | "list" | "glass";

interface SectionProps {
  title: string;
  variant?: CardVariant;
  items: {
    title: string;
    desc: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    color?: string; // gradient or accent
  }[];
}

export function Section({ title, items, variant = "default" }: SectionProps) {
  return (
    <section className="py-6">
      <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-12 text-center">
        {title}
      </h2>

      <div
        className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ${
          variant === "list" ? "max-w-4xl mx-auto" : ""
        }`}>
        {items.map((item, idx) => {
          switch (variant) {
            case "bordered":
              return (
                <div
                  key={idx}
                  className="group flex flex-col items-center text-center border border-gray-200 rounded-2xl p-8 hover:border-blue-500 transition">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-4 group-hover:border-blue-500">
                    <item.icon className="w-7 h-7 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              );

            case "gradient":
              return (
                <div
                  key={idx}
                  className={`bg-gradient-to-r ${
                    item.color || "from-blue-500 to-indigo-600"
                  } rounded-2xl p-8 text-white shadow-lg`}>
                  <item.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              );

            case "list":
              return (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow hover:shadow-md transition">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-blue-100 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              );

            case "glass":
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-white/20">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm">{item.desc}</p>
                </div>
              );

            default: // "default"
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-8 text-center">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${
                      item.color || "from-blue-500 to-indigo-600"
                    } flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}>
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
          }
        })}
      </div>
    </section>
  );
}
