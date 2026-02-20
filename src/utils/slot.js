// slots are objects { date: "YYYY-MM-DD", from: "HH:MM", to: "HH:MM" }

function timeToMinutes(t) {
  const [h,m] = t.split(":").map(Number);
  return h*60 + m;
}

// find first overlapping slot (ordered by appearance in arrays)
export function findFirstCommonSlot(slotsA, slotsB) {
  for (const a of slotsA) {
    for (const b of slotsB) {
      if (a.date !== b.date) continue;
      const start = Math.max(timeToMinutes(a.from), timeToMinutes(b.from));
      const end = Math.min(timeToMinutes(a.to), timeToMinutes(b.to));
      if (start < end) {
        // convert minutes back to HH:MM
        const sH = String(Math.floor(start/60)).padStart(2,"0");
        const sM = String(start%60).padStart(2,"0");
        const eH = String(Math.floor(end/60)).padStart(2,"0");
        const eM = String(end%60).padStart(2,"0");
        return { date: a.date, from: `${sH}:${sM}`, to: `${eH}:${eM}` };
      }
    }
  }
  return null;
}
