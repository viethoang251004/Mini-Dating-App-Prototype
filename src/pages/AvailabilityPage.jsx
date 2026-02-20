import { useState, useEffect } from "react";
import { getProfileById, upsertProfile } from "../utils/storage";
import { findFirstCommonSlot } from "../utils/slot";
import { getProfiles } from "../utils/storage";

export default function AvailabilityPage({ meId, partnerId }) {
  const me = getProfileById(meId);
  const partner = getProfileById(partnerId);
  const [slots, setSlots] = useState(me?.availability || []);

  useEffect(()=> {
    if (me) setSlots(me.availability || []);
  }, [meId]);

  function addSlot(date, from, to) {
    const newSlots = [...slots, { date, from, to }];
    setSlots(newSlots);
    const updated = { ...me, availability: newSlots };
    upsertProfile(updated);
  }

  function checkMatchSlot() {
    const partnerSlots = partner?.availability || [];
    const common = findFirstCommonSlot(slots, partnerSlots);
    return common;
  }

  return (
    <div>
      <h3>Set availability (3 weeks)</h3>
      {/* Simple inputs for demonstration */}
      <input id="date" type="date"/>
      <input id="from" type="time"/>
      <input id="to" type="time"/>
      <button onClick={() => {
        const date = document.getElementById('date').value;
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        if(!date||!from||!to) return alert('complete fields');
        addSlot(date, from, to);
      }}>Add slot</button>

      <h4>Your slots</h4>
      <ul>{slots.map((s,i) => <li key={i}>{s.date} {s.from}-{s.to}</li>)}</ul>

      <h4>Check for first common slot with partner</h4>
      <button onClick={() => {
        const common = checkMatchSlot();
        if(common) alert(`Hai bạn có date hẹn vào: ${common.date} ${common.from}-${common.to}`);
        else alert('Chưa tìm được thời gian trùng. Vui lòng chọn lại.');
      }}>Find first common slot</button>
    </div>
  );
}
