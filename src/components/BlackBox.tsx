export default function BlackBox({
  description,
  text,
}: {
  description?: string;
  text: string;
}) {
  return (
    <div className="bg-black rounded-4xl md:rounded-[2.5rem] p-5 md:p-10 md:pl-14 md:pr-14 flex flex-col gap-3">
      {description && (
        <span className="text-white font-semibold text-xl md:text-2xl">
          {description}
        </span>
      )}
      <span className="text-white font-bold text-3xl md:text-4xl">{text}</span>
    </div>
  );
}
