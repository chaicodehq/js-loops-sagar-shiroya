/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  let teamList = {};
  // basic validation
  if (!Array.isArray(matches)) return [];

  for (const match of matches) {
    if (match.result !== "win") {
      updateTeam(teamList, match.team1, match.result);
      updateTeam(teamList, match.team2, match.result);
      continue;
    }
    const winningTeam = match.winner;
    const losingTeam = match.team1 === winningTeam ? match.team2 : match.team1;
    updateTeam(teamList, winningTeam, match.result);
    updateTeam(teamList, losingTeam, "lost");
  }

  let pointsTable = Object.values(teamList);
  pointsTable.sort((team1, team2) => {
    const firstTeam = team1.team;
    const secondTeam = team2.team;
    if (team1.points > team2.points) return -1;
    else if (team1.points < team2.points) return 1;
    // sort tied points team alphabatically
    return firstTeam.localeCompare(secondTeam);
  });

  return pointsTable;
}

function updateTeam(teamList, team, result) {
  let point = 0;
  let finalResult = "";
  let newTeam = {
    team,
    played: 1,
    won: 0,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 0,
  };

  switch (result) {
    case "win":
      point = 2;
      finalResult = "won";
      break;
    case "tie":
      finalResult = "tied";
      point = 1;
      break;
    case "no_result":
      finalResult = "noResult";
      point = 1;
      break;
    default:
      finalResult = result;
      point = 0;
  }

  if (team in teamList) {
    const currentTeam = teamList[team];
    currentTeam[finalResult] += 1;
    currentTeam.points += point;
    currentTeam.played += 1;
  } else {
    newTeam[finalResult] += 1;
    newTeam.points += point;
    teamList[team] = newTeam;
  }
}
