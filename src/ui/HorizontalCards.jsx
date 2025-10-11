import Card from "./Card";

export default function HorizontalCards({ data, title = "Trending" }) {
  return (
    <section className="w-full p-4 pb-0">
      {/* Section Heading */}
      <h2 className="mb-4 text-xl font-semibold text-zinc-200">{title}</h2>

      {/* Scrollable Row */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {data.map((item) => (
          <Card item={item} key={item.id} type="horizontalCard" />
        ))}
      </div>
    </section>
  );
}
