import { useState } from "react";
import CreateProfile from "./pages/CreateProfile";
import ProfileList from "./pages/ProfileList";
import AvailabilityPage from "./pages/AvailabilityPage";
import { getProfiles } from "./utils/storage";

export default function App(){
  const profiles = getProfiles();
  const [currentId, setCurrentId] = useState(profiles[0]?.id || "");
  const [view, setView] = useState("list");
  const [partnerId, setPartnerId] = useState(null);

  return (
    <div>
      <h1>Mini Dating (Demo)</h1>
      <nav>
        <button onClick={()=>setView("create")}>Create/Edit Profile</button>
        <button onClick={()=>setView("list")}>Profiles</button>
      </nav>

      {view==="create" && <CreateProfile currentId={currentId} onSaved={(id)=>{ setCurrentId(id); setView("list"); }} />}

      {view==="list" && <ProfileList currentId={currentId} onOpenAvailability={(pid)=>{ setPartnerId(pid); setView("availability") }} />}

      {view==="availability" && partnerId && <AvailabilityPage meId={currentId} partnerId={partnerId} />}
    </div>
  );
}
