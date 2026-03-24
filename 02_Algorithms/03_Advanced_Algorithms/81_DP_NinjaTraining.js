/**
 * Problem: Maximize points over N days.
 * Constraint: Cannot do the same task two days in a row.
 * Tasks: 0, 1, 2
 */

function ninjaTraining(n, points) {
  // Pichle din ke max points store karne ke liye (Activity 0, 1, 2)
  let prev = new Array(4).fill(0);

  // Day 0: Initial setup
  prev[0] = Math.max(points[0][1], points[0][2]); // Agar last activity 0 thi
  prev[1] = Math.max(points[0][0], points[0][2]); // Agar last activity 1 thi
  prev[2] = Math.max(points[0][0], points[0][1]); // Agar last activity 2 thi
  prev[3] = Math.max(points[0][0], points[0][1], points[0][2]); // Koi bhi last activity

  // Baki dinon ke liye loop
  for (let day = 1; day < n; day++) {
    let temp = new Array(4).fill(0);
    
    for (let last = 0; last < 4; last++) {
      temp[last] = 0;
      
      // Aaj ki activity check karein (task)
      for (let task = 0; task < 3; task++) {
        if (task !== last) {
          let point = points[day][task] + prev[task];
          temp[last] = Math.max(temp[last], point);
        }
      }
    }
    prev = temp;
  }

  return prev[3];
}

// --- TESTING THE NINJA ---
const points = [
  [10, 40, 70], // Day 0
  [20, 50, 80], // Day 1
  [100, 2, 3]   // Day 2
];

console.log("Maximum Training Points:", ninjaTraining(3, points)); 
// Expected Path: 70 (Day 0) -> 50 (Day 1) -> 100 (Day 2) = 220