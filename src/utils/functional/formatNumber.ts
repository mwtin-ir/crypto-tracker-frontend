export function fnum(
  num: string | number | undefined,
  NanNum?: string | number | undefined
): string {
  if (num == null) return "-";

  const value = Number(num);
  const fallback = NanNum !== undefined ? Number(NanNum) : 0;

  return (Number.isNaN(value) ? fallback : value).toLocaleString("fa-IR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  });
}
