import Card from "./Card";
import SelectDropdown from "./SelectDropdown";

export default function HorizontalCards({
  data,
  title = "Trending",
  value,
  onChangeSelect,
  options,
  parentId,
  detailsTitle,
}) {
  return (
    <section className="w-full p-4 pb-0">
      {/* Section Heading */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-200">{title}</h2>
        {value && (
          <SelectDropdown
            value={value}
            onChangeSelect={onChangeSelect}
            options={options}
          />
        )}
      </div>

      {/* Scrollable Row */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {data.map((item) => (
          <Card
            item={item}
            key={item.id}
            type="horizontalCard"
            parentId={parentId}
            detailsTitle={detailsTitle}
          />
        ))}
      </div>
    </section>
  );
}
