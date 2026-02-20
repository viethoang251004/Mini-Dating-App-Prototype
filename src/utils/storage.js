// simple localStorage helpers
const KEY = "profiles";

export function getProfiles() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveProfiles(profiles) {
  localStorage.setItem(KEY, JSON.stringify(profiles));
}

export function getProfileById(id) {
  return getProfiles().find(p => p.id === id);
}

export function upsertProfile(profile) {
  const ps = getProfiles();
  const idx = ps.findIndex(p => p.id === profile.id);
  if (idx >= 0) ps[idx] = profile;
  else ps.push(profile);
  saveProfiles(ps);
}
