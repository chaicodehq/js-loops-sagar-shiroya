/**
 * 🪔 Sharma ji ki Diwali Decoration
 *
 * Sharma ji apne ghar ko Diwali pe sajana chahte hain light strings se.
 * Unke paas ek budget hai aur market mein alag alag colors ki light strings
 * hain different lengths mein. Sharma ji sab kuch lena chahte hain, lekin
 * budget se zyada nahi!
 *
 * Color rates (per meter):
 *   - "golden" = Rs 50/meter
 *   - "multicolor" = Rs 40/meter
 *   - "white" = Rs 30/meter
 *   - Any other color = Rs 35/meter
 *
 * Rules:
 *   Step 1 - Use for...of to loop through lightStrings and add ALL of them
 *     to selected list with their cost calculated
 *   Step 2 - Use a while loop to check: agar totalCost > budget, toh remove
 *     the LAST item from selected, subtract its cost, and keep removing until
 *     totalCost <= budget
 *
 * @param {Array<{color: string, length: number}>} lightStrings - Available light strings
 * @param {number} budget - Sharma ji ka budget in rupees
 * @returns {{ selected: Array<{color: string, length: number, cost: number}>, totalLength: number, totalCost: number }}
 *
 * Validation:
 *   - Agar lightStrings array nahi hai ya budget positive number nahi hai,
 *     return: { selected: [], totalLength: 0, totalCost: 0 }
 *
 * @example
 *   diwaliLightsPlan(
 *     [{ color: "golden", length: 5 }, { color: "white", length: 10 }, { color: "multicolor", length: 3 }],
 *     400
 *   )
 *   // golden: 5*50=250, white: 10*30=300, multicolor: 3*40=120
 *   // Total = 670 > 400, remove multicolor (670-120=550), still > 400,
 *   // remove white (550-300=250), 250 <= 400
 *   // => { selected: [{ color: "golden", length: 5, cost: 250 }], totalLength: 5, totalCost: 250 }
 */
export function diwaliLightsPlan(lightStrings, budget) {
  const result = {
    selected: [],
    totalLength: 0,
    totalCost: 0,
  };

  const priceList = {
    golden: 50,
    multicolor: 40,
    white: 30,
    other: 35,
  };

  // checked the validation
  if (!Array.isArray(lightStrings) || typeof budget != "number" || budget < 0)
    return result;

  let selectedItems = [];
  let totalCost = 0;
  let totalLength = 0;
  // actual calculation
  for (const light of lightStrings) {
    let lightPrice = 0;

    if (light["color"] in priceList) {
      lightPrice = priceList[light["color"]];
    } else {
      lightPrice = priceList["other"];
    }

    // calculate colorcost and push to temp list
    const colorCost = light["length"] * lightPrice;
    totalCost += colorCost;
    totalLength += light["length"];
    selectedItems.push({
      color: light["color"],
      length: light["length"],
      cost: colorCost,
    });
  }

  // remove last item until total cost within the budget
  while (totalCost > budget) {
    const removedItem = selectedItems.pop();
    totalCost -= removedItem.cost;
    totalLength -= removedItem.length;
  }

  // assign final values to result object
  result.selected = selectedItems;
  result.totalLength = totalLength;
  result.totalCost = totalCost;

  return result;
}
