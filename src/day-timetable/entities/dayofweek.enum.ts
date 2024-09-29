export enum DayOfWeek {
  sun = 1,
  mon,
  tue,
  wed,
  thu,
  fri,
  sat,
}

const dayMap: Record<string, DayOfWeek> = {
  sun: DayOfWeek.sun,
  mon: DayOfWeek.mon,
  tue: DayOfWeek.tue,
  wed: DayOfWeek.wed,
  thu: DayOfWeek.thu,
  fri: DayOfWeek.fri,
  sat: DayOfWeek.sat,
};

export function getDayOfWeekEnum(day: string): DayOfWeek | undefined {
  return dayMap[day];
}
