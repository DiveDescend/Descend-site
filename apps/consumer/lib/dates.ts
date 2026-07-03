export type ISODate = string; // "YYYY-MM-DD"

export function toISODate(d: Date): ISODate {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function todayISO(): ISODate {
  return toISODate(new Date());
}

export function daysFromNow(n: number): ISODate {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

export function addDaysISO(iso: ISODate, days: number): ISODate {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}
