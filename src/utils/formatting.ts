export function formatAtLeast2SignificantNoSci(value: number) {
  if (value === 0) return "0";

  const rounded = Number.parseFloat(value.toPrecision(2));

  // If the value is in scientific notation, convert it to plain decimal
  const plain = rounded.toLocaleString("fullwide", { useGrouping: false });

  return plain;
}
