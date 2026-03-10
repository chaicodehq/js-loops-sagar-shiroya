/**
 * 🚂 IRCTC Tatkal Reservation System
 *
 * IRCTC ka simplified reservation system bana! Passengers ka list hai,
 * trains ka list hai with available seats. Har passenger ko uski preferred
 * class mein seat dene ki koshish kar. Agar nahi mili, toh fallback class
 * try kar. Agar woh bhi nahi, toh waitlist kar de.
 *
 * Train object structure:
 *   { trainNumber: "12345", name: "Rajdhani Express",
 *     seats: { sleeper: 3, ac3: 2, ac2: 1, ac1: 0 } }
 *
 * Passenger object structure:
 *   { name: "Rahul", trainNumber: "12345",
 *     preferred: "ac3", fallback: "sleeper" }
 *
 * Rules (use nested loops):
 *   - Process passengers in order (FIFO - first come first served)
 *   - For each passenger:
 *     1. Find the train matching trainNumber
 *     2. Try preferred class first: if seats > 0, allocate (decrement seat count)
 *        Result: { name, trainNumber, class: preferred, status: "confirmed" }
 *     3. If preferred not available, try fallback class
 *        Result: { name, trainNumber, class: fallback, status: "confirmed" }
 *     4. If neither available, waitlist the passenger
 *        Result: { name, trainNumber, class: preferred, status: "waitlisted" }
 *     5. If train not found, result:
 *        { name, trainNumber, class: null, status: "train_not_found" }
 *   - Seats are MUTATED: when a seat is allocated, decrement the count
 *     so later passengers see updated availability
 *
 * Validation:
 *   - Agar passengers ya trains array nahi hai ya empty hai, return []
 *
 * @param {Array<{name: string, trainNumber: string, preferred: string, fallback: string}>} passengers
 * @param {Array<{trainNumber: string, name: string, seats: Object<string, number>}>} trains
 * @returns {Array<{name: string, trainNumber: string, class: string|null, status: string}>}
 *
 * @example
 *   railwayReservation(
 *     [{ name: "Rahul", trainNumber: "12345", preferred: "ac3", fallback: "sleeper" }],
 *     [{ trainNumber: "12345", name: "Rajdhani", seats: { sleeper: 5, ac3: 0, ac2: 1, ac1: 0 } }]
 *   )
 *   // ac3 has 0 seats, try fallback sleeper (5 seats), allocated!
 *   // => [{ name: "Rahul", trainNumber: "12345", class: "sleeper", status: "confirmed" }]
 */
export function railwayReservation(passengers, trains) {
    let result = [];

    if (
        !Array.isArray(passengers) ||
        !Array.isArray(trains) ||
        trains.length === 0 ||
        passengers.length === 0
    ) {
        return result;
    }

    for (const passenger of passengers) {
        let p = {};
        p.name = passenger.name;
        for (const train of trains) {
            if (passenger.trainNumber === train.trainNumber) {
                p.trainNumber = train.trainNumber;
                if (train["seats"][passenger.preferred] > 0) {
                    p.class = passenger.preferred;
                    p.status = "confirmed";
                    train["seats"][passenger.preferred] =
                        train["seats"][passenger.preferred] - 1;
                } else if (train["seats"][passenger.fallback] > 0) {
                    p.class = passenger.fallback;
                    p.status = "confirmed";
                    train["seats"][passenger.fallback] =
                        train["seats"][passenger.fallback] - 1;
                } else {
                    p.class = passenger.preferred;
                    p.status = "waitlisted";
                }
                break;
            }
        }
        if (p.status == null) {
            p.trainNumber = passenger.trainNumber;
            p.class = null;
            p.status = "train_not_found";
        }
        result.push(p);
    }
    return result;
}

// console.log(
//     railwayReservation(
//         [
//             {
//                 name: "Rahul",
//                 trainNumber: "12345",
//                 preferred: "ac3",
//                 fallback: "sleeper",
//             },
//             {
//                 name: "Sagar",
//                 trainNumber: "12345",
//                 preferred: "ac3",
//                 fallback: "sleeper",
//             },
//             {
//                 name: "Bhupy",
//                 trainNumber: "12345",
//                 preferred: "ac3",
//                 fallback: "sleeper",
//             },
//         ],
//         [
//             {
//                 trainNumber: "12345",
//                 name: "Rajdhani",
//                 seats: { sleeper: 1, ac3: 0, ac2: 1, ac1: 0 },
//             },
//         ],
//     ),
// );
