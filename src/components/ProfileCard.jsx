export default function ProfileCard({ profile, isCurrent=false, onLike, onOpenAvailability }) {
  return (
    <div className="card">
      <h4>{profile.name} ({profile.age})</h4>
      <div>{profile.gender}</div>
      <p>{profile.bio}</p>
      <div>{profile.email}</div>
      {!isCurrent && <button onClick={() => onLike(profile.id)}>Like</button>}
      {profile.matches.length > 0 && <div>Matches: {profile.matches.length}</div>}
      {isCurrent && <button onClick={() => onOpenAvailability()}>Set Availability</button>}
    </div>
  );
}
