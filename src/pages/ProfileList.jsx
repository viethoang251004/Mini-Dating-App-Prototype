import { useState } from "react";
import { getProfiles } from "../utils/storage";
import { likeUser } from "../utils/match";
import ProfileCard from "../components/ProfileCard";

export default function ProfileList({ currentId, onOpenAvailability }) {
  const [profiles, setProfiles] = useState(getProfiles());

  function handleLike(targetId) {
    const res = likeUser(currentId, targetId);
    setProfiles(getProfiles()); // refresh
    if (res?.becameMatch) {
      alert("It's a Match!");
    }
  }

  return (
    <div>
      {profiles.map(p => (
        <ProfileCard
          key={p.id}
          profile={p}
          isCurrent={p.id === currentId}
          onLike={handleLike}
          onOpenAvailability={() => onOpenAvailability(p.id)}
        />
      ))}
    </div>
  );
}
