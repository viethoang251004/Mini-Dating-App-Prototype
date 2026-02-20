// match utils: like, check for mutual like, add match
import { getProfiles, saveProfiles } from "./storage";

export function likeUser(currentId, targetId) {
  const ps = getProfiles();
  const curr = ps.find(p => p.id === currentId);
  const target = ps.find(p => p.id === targetId);
  if (!curr || !target) return null;

  if (!curr.likes.includes(targetId)) curr.likes.push(targetId);

  // check mutual like
  let becameMatch = false;
  if (target.likes.includes(currentId) && !curr.matches.includes(targetId)) {
    curr.matches.push(targetId);
    target.matches.push(currentId);
    becameMatch = true;
  }

  saveProfiles(ps);
  return { becameMatch, curr, target };
}
