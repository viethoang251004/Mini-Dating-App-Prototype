# Mini Dating App – Technical Test Submission

This project is built as part of the Web Developer Intern technical test.

The application simulates a simplified dating flow inspired by curated dating apps:
- Create profile
- Like & mutual match
- Select availability
- Find first common time slot for a date

The focus of this submission is:
- Clean logic
- Clear data modeling
- Correct matching algorithm
- Proper explanation of trade-offs

---

# Tech Stack

- React (Vite)
- JavaScript
- LocalStorage (no backend)
- Deployed on Vercel

---

# System Architecture

This is a Single Page Application (SPA).

Data is stored entirely in the browser using:

localStorage
Key: "profiles"

No authentication system is implemented as it was not required in the assignment.

---

# Data Model

Each profile is stored as:

```js
{
  id: string,
  name: string,
  age: number,
  gender: string,
  bio: string,
  email: string,
  likes: string[],        // userIds this user liked
  matches: string[],      // mutual matches
  availability: [
    {
      date: "YYYY-MM-DD",
      from: "HH:MM",
      to: "HH:MM"
    }
  ]
}


PHẦN A – Create Profile

- Users can:

Create profile

Edit profile

Persist data after reload

- Implementation details:

On submit → data saved to localStorage

upsertProfile() handles create/update

Basic validation: name & email required

- Trade-off:

Using localStorage keeps the app simple and deployable without backend

Not suitable for production scale


PHẦN B – Like & Match Logic

1/ Like Logic

- When user A likes user B:

B’s id is added to A.likes

2/ Match Logic

A match occurs if:

+ A.likes includes B AND B.likes includes A

When mutual like happens:

+ Both users’ matches[] are updated

+ UI displays: "It’s a Match"

Time complexity:

+ O(1) for like check (array includes)

Data persistence:

+ Matches are stored in localStorage and remain after reload


PHẦN C – Availability & First Common Slot
Each matched user can:

+ Add available time slots within 3 weeks

Slots follow format:

{
  date: "YYYY-MM-DD",
  from: "HH:MM",
  to: "HH:MM"
}


## Slot Matching Algorithm:
To find the first common slot:
For each slot A:
For each slot B:
If same date:
    start = max(fromA, fromB)
    end = min(toA, toB)
    If start < end -> overlap found
-> Return first overlap.

Time Complexity:
O(n * m)
Where:
n = number of slots of user A
m = number of slots of user B
-> Given small data size, this is acceptable.


## Edge Cases Handled:
No overlap -> show:
"Chưa tìm được thời gian trùng. Vui lòng chọn lại."
Adjacent times (10:00–11:00 and 11:00–12:00) → no overlap
Different dates → no overlap
Partial overlap → correctly detected


## Test Scenarios:
1. Create 2 users
2. A likes B -> nothing happens
3. B likes A -> "It's a Match"
4. Add availability for both
5. Test:
+ Exact overlap
+ Partial overlap
+ No overlap


## If I Had More Time:
Improvements I would implement:
1. Backend with Node.js + Express + MongoDB
2. Authentication (JWT/OAuth)
3. Optimized slot matching using sorted intervals
4. UI improvements
5. Real-time match notification
6. Prevent invalid time input (from >= to)


## Additional Feature Suggestions:
1. Limit number of matches per week (curated dating style)
2. Chat feature after match
3. Auto-suggest best meeting time instead of first found
4. Filter profiles by age range