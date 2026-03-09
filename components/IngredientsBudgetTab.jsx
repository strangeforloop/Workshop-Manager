export function IngredientsBudgetTab({
  ws,
  scale,
  totalCost,
  costPerPerson,
  budgetLeft,
  addIngredient,
  updateIngredient,
  removeIngredient,
  update,
}) {
  const units = ["g", "kg", "ml", "L", "tsp", "tbsp", "cup", "oz", "lb", "piece", "bunch", "pinch"];
  const attendees = ws.rsvpCount > 0 ? ws.rsvpCount : ws.baseServings;
  const isScaled = ws.rsvpCount > 0;

  const rows = ws.ingredients.map(ing => {
    const baseQty = parseFloat(ing.baseQty) || 0;
    const costPer = parseFloat(ing.costPer) || 0;
    const packageSize = parseFloat(ing.packageSize) || 1;
    const scaledQty = baseQty * scale;
    const lineCost = costPer * scaledQty;
    const pkgsNeeded = packageSize > 0 ? Math.ceil(scaledQty / packageSize) : 0;
    const pctOfTotal = totalCost > 0 ? (lineCost / totalCost) * 100 : 0;
    return { ...ing, baseQty, costPer, packageSize, scaledQty, lineCost, pkgsNeeded, pctOfTotal };
  });

  return (
    <div>
      <div className="budget-summary" style={{ marginBottom: "1.5rem" }}>
        <div className="budget-item">
          <div className="budget-value">${totalCost.toFixed(2)}</div>
          <div className="budget-label">
            {isScaled ? `Total for ${attendees} ppl` : `Base batch cost`}
          </div>
        </div>
        <div className="budget-item">
          <div className={`budget-value ${ws.budget > 0 && budgetLeft < 0 ? "budget-over" : ""}`}>
            {ws.budget > 0 ? `$${Math.abs(budgetLeft).toFixed(2)} ${budgetLeft < 0 ? "over" : "left"}` : "—"}
          </div>
          <div className="budget-label">
            {ws.budget > 0 ? `of $${ws.budget} budget` : "no budget set"}
          </div>
        </div>
        <div className="budget-item">
          <div className="budget-value">${costPerPerson.toFixed(2)}</div>
          <div className="budget-label">per person</div>
        </div>
      </div>

      <div
        style={{
          background: "#FEF7F0",
          border: "1px solid var(--accent-light)",
          borderRadius: 10,
          padding: "0.85rem 1rem",
          marginBottom: "1.25rem",
          fontSize: "0.84rem",
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        💡{" "}
        <strong style={{ color: "var(--text)" }}>How costs work:</strong> Enter{" "}
        <em>Cost per unit</em> (e.g. $0.15 per gram) and <em>Package size</em> (e.g. 1000g bag).
        The app calculates total cost = cost/unit × scaled quantity, and how many packages you
        need to buy.
        {isScaled && (
          <span>
            {" "}
            Currently scaled{" "}
            <strong style={{ color: "var(--accent)" }}>{scale.toFixed(2)}×</strong> for{" "}
            {attendees} attendees.
          </span>
        )}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="ingredient-table">
          <thead>
            <tr>
              <th style={{ minWidth: 130 }}>Ingredient</th>
              <th>Base Qty</th>
              <th>Unit</th>
              <th>$/Unit</th>
              <th>Pkg Size</th>
              {isScaled && <th style={{ color: "var(--accent)" }}>Scaled Qty</th>}
              {isScaled && <th>Pkgs to Buy</th>}
              <th>Line Cost</th>
              <th>Share</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map(ing => (
              <tr key={ing.id}>
                <td>
                  <input
                    value={ing.name}
                    onChange={e => updateIngredient(ing.id, "name", e.target.value)}
                    placeholder="Ingredient"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={ing.baseQty}
                    min="0"
                    step="any"
                    onChange={e => updateIngredient(ing.id, "baseQty", e.target.value)}
                    style={{ width: 70 }}
                  />
                </td>
                <td>
                  <select
                    value={ing.unit}
                    onChange={e => updateIngredient(ing.id, "unit", e.target.value)}
                    style={{
                      border: "1.5px solid var(--stone)",
                      borderRadius: 6,
                      padding: "0.35rem 0.4rem",
                      fontFamily: "inherit",
                      fontSize: "0.9rem",
                    }}
                  >
                    {units.map(u => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>$</span>
                    <input
                      type="number"
                      value={ing.costPer}
                      min="0"
                      step="0.01"
                      onChange={e => updateIngredient(ing.id, "costPer", e.target.value)}
                      style={{ width: 72 }}
                      placeholder="0.00"
                    />
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <input
                      type="number"
                      value={ing.packageSize}
                      min="0.01"
                      step="any"
                      onChange={e => updateIngredient(ing.id, "packageSize", e.target.value)}
                      style={{ width: 68 }}
                    />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {ing.unit}
                    </span>
                  </div>
                </td>
                {isScaled && (
                  <td>
                    <span className="scaled-val">
                      {ing.scaledQty % 1 === 0 ? ing.scaledQty : ing.scaledQty.toFixed(1)}{" "}
                      {ing.unit}
                    </span>
                  </td>
                )}
                {isScaled && (
                  <td>
                    <span
                      style={{
                        fontWeight: 600,
                        color: ing.pkgsNeeded > 0 ? "var(--green)" : "var(--text-muted)",
                      }}
                    >
                      {ing.pkgsNeeded > 0 ? `×${ing.pkgsNeeded}` : "—"}
                    </span>
                  </td>
                )}
                <td>
                  <span
                    style={{
                      fontWeight: 600,
                      color: ing.lineCost > 0 ? "var(--text)" : "var(--text-muted)",
                    }}
                  >
                    {ing.lineCost > 0 ? `$${ing.lineCost.toFixed(2)}` : "—"}
                  </span>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      minWidth: 70,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 5,
                        background: "var(--stone)",
                        borderRadius: 3,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: ing.pctOfTotal + "%",
                          background: "var(--accent)",
                          borderRadius: 3,
                          transition: "width 0.3s",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.76rem",
                        color: "var(--text-muted)",
                        width: 28,
                        textAlign: "right",
                      }}
                    >
                      {ing.pctOfTotal.toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td>
                  <button className="icon-btn" onClick={() => removeIngredient(ing.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr>
                <td
                  colSpan={isScaled ? 7 : 5}
                  style={{ paddingTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}
                >
                  {rows.length} ingredient{rows.length !== 1 ? "s" : ""}
                </td>
                <td
                  style={{
                    paddingTop: "0.75rem",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--text)",
                  }}
                >
                  ${totalCost.toFixed(2)}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <button className="add-row-btn" onClick={addIngredient}>
        ＋ Add Ingredient
      </button>

      <div className="divider" style={{ marginTop: "1.5rem" }} />

      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Total Budget ($)</label>
          <input
            type="number"
            className="form-input"
            value={ws.budget}
            min="0"
            step="5"
            onChange={e => update({ budget: parseFloat(e.target.value) || 0 })}
            style={{ maxWidth: 160 }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Base Recipe Serves</label>
          <input
            type="number"
            className="form-input"
            value={ws.baseServings}
            min="1"
            onChange={e => update({ baseServings: parseInt(e.target.value, 10) || 1 })}
            style={{ maxWidth: 120 }}
          />
        </div>
        {ws.budget > 0 && (
          <div style={{ paddingBottom: "0.1rem" }}>
            <span className={`chip ${budgetLeft < 0 ? "chip-orange" : "chip-green"}`}>
              {budgetLeft < 0
                ? `⚠️ $${Math.abs(budgetLeft).toFixed(2)} over budget`
                : `✓ $${budgetLeft.toFixed(2)} under budget`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

