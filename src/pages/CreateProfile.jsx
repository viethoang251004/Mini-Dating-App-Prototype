import { useState, useEffect } from "react";
import { getProfiles, upsertProfile } from "../utils/storage";

export default function CreateProfile({ currentId, onSaved }) {
  const [p, setP] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    bio: "",
    email: "",
    likes: [],
    matches: [],
    availability: []
  });

  useEffect(() => {
    if (currentId) {
      const ps = getProfiles();
      const found = ps.find(x => x.id === currentId);
      if (found) setP(found);
    }
  }, [currentId]);

  function onChange(e) {
    const { name, value } = e.target;
    setP(prev => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    // basic validation
    if (!p.name || !p.email) return alert("Please fill name and email");
    if (!p.id) p.id = Date.now().toString();
    upsertProfile(p);
    onSaved && onSaved(p.id);
    alert("Saved");
  }

  return (
    <form onSubmit={submit} style={{maxWidth:480}}>
      <input name="name" value={p.name} onChange={onChange} placeholder="Name" required/>
      <input name="age" type="number" value={p.age} onChange={onChange} placeholder="Age" required/>
      <select name="gender" value={p.gender} onChange={onChange} required>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <textarea name="bio" value={p.bio} onChange={onChange} placeholder="Short bio" />
      <input name="email" type="email" value={p.email} onChange={onChange} placeholder="Email" required/>
      <button type="submit">Save profile</button>
    </form>
  );
}
