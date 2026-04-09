import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
} from "@mui/material";
import { workshopPalette } from "../src/theme/workshopTheme";

export function IngredientsBudgetTab({
  ws,
  scale,
  totalCost,
  costPerPerson,
  budgetLeft,
  addIngredient,
  updateIngredient,
  removeIngredient,
}) {
  const units = ["g", "kg", "ml", "L", "tsp", "tbsp", "cup", "oz", "lb", "piece", "bunch", "pinch"];
  const attendees = ws.rsvpCount > 0 ? ws.rsvpCount : ws.baseServings;
  const isScaled = ws.rsvpCount > 0;

  /** Sticky header + tbody area ≈ four ingredient rows (scroll beyond that) */
  const INGREDIENT_TABLE_SCROLL_MAX_PX = 360;

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
    <Box
      className="ingredient-table"
      sx={{
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          background: "linear-gradient(135deg, #6B4E52 0%, #5A3E42 100%)",
          borderRadius: 2,
          p: { xs: 2.5, sm: 1.5 },
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: { xs: 2, sm: 1.5 },
          mb: { xs: 2, sm: 1.5 },
          border: "3px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: t => t.typography.h5.fontFamily, fontWeight: 700, color: workshopPalette.cream }}
          >
            ${totalCost.toFixed(2)}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              color: workshopPalette.tan,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {isScaled ? `Total for ${attendees} ppl` : `Base batch cost`}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: t => t.typography.h5.fontFamily,
              fontWeight: 700,
              color: ws.budget > 0 && budgetLeft < 0 ? "#FF7B7B" : workshopPalette.cream,
            }}
          >
            {ws.budget > 0 ? `$${Math.abs(budgetLeft).toFixed(2)} ${budgetLeft < 0 ? "over" : "left"}` : "—"}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              color: workshopPalette.tan,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {ws.budget > 0 ? `of $${ws.budget} budget` : "no budget set"}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: t => t.typography.h5.fontFamily, fontWeight: 700, color: workshopPalette.cream }}
          >
            ${costPerPerson.toFixed(2)}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              color: workshopPalette.tan,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            per person
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          mb: 1,
          border: `1px solid ${workshopPalette.stone}`,
          borderRadius: 1,
          bgcolor: "background.paper",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              minWidth: "min-content",
              width: "100%",
            }}
          >
            <TableContainer
              component={Paper}
              elevation={0}
              className="ingredient-table-mui"
              sx={{
                flex: "1 1 auto",
                minHeight: 0,
                maxHeight: {
                  xs: `min(${INGREDIENT_TABLE_SCROLL_MAX_PX}px, 40vh)`,
                  sm: INGREDIENT_TABLE_SCROLL_MAX_PX,
                },
                border: "none",
                borderRadius: 0,
                maxWidth: "none",
                width: "100%",
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
        <Table
          stickyHeader
          size="small"
          sx={{
            width: "max-content",
            minWidth: "100%",
            tableLayout: "auto",
            "& .ingredient-col-share": { minWidth: 120, whiteSpace: "nowrap" },
            "& .ingredient-col-remove": { minWidth: 124, whiteSpace: "nowrap", boxSizing: "border-box" },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  bgcolor: "rgba(237, 216, 205, 0.97)",
                  color: workshopPalette.brown,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: `1px solid ${workshopPalette.stone}`,
                },
              }}
            >
              <TableCell sx={{ minWidth: 200 }}>Ingredient</TableCell>
              <TableCell sx={{ width: 76, minWidth: 76, maxWidth: 76, whiteSpace: "nowrap" }}>Base Qty</TableCell>
              <TableCell sx={{ minWidth: 112 }}>Unit</TableCell>
              <TableCell sx={{ minWidth: 136 }}>$/Unit</TableCell>
              <TableCell sx={{ minWidth: 140 }}>Pkg Size</TableCell>
              {isScaled && (
                <TableCell sx={{ color: "primary.main", fontWeight: 700, width: 100, minWidth: 100 }}>
                  Scaled Qty
                </TableCell>
              )}
              {isScaled && (
                <TableCell sx={{ width: 96, minWidth: 96 }}>Pkgs to Buy</TableCell>
              )}
              <TableCell sx={{ width: 96, minWidth: 96 }}>Line Cost</TableCell>
              <TableCell className="ingredient-col-share">Share</TableCell>
              <TableCell className="ingredient-col-remove" sx={{ px: 1.5, textAlign: "right" }}>
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(ing => (
              <TableRow key={ing.id}>
                <TableCell sx={{ minWidth: 200, verticalAlign: "middle" }}>
                  <TextField
                    size="small"
                    fullWidth
                    value={ing.name}
                    onChange={e => updateIngredient(ing.id, "name", e.target.value)}
                    placeholder="Ingredient"
                    sx={{
                      minWidth: 160,
                      "& .MuiInputBase-input::placeholder": { opacity: "0.55" },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ width: 76, minWidth: 76, maxWidth: 76, verticalAlign: "middle", px: 1 }}>
                  <TextField
                    size="small"
                    type="number"
                    value={ing.baseQty}
                    inputProps={{ min: 0, step: "any" }}
                    onChange={e => updateIngredient(ing.id, "baseQty", e.target.value)}
                    sx={{
                      width: 64,
                      flexShrink: 0,
                      "& .MuiOutlinedInput-root": { pr: 0.5 },
                      "& input": { py: 0.75, textAlign: "center", px: 0.5 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ width: 112, minWidth: 112, verticalAlign: "middle" }}>
                  <FormControl size="small" fullWidth sx={{ minWidth: 96 }}>
                    <Select
                      value={ing.unit}
                      onChange={e => updateIngredient(ing.id, "unit", e.target.value)}
                      sx={{
                        borderRadius: 1.5,
                        minWidth: 96,
                        "& .MuiSelect-select": {
                          overflow: "visible",
                          textOverflow: "clip",
                          minWidth: "3ch",
                        },
                      }}
                    >
                      {units.map(u => (
                        <MenuItem key={u} value={u}>
                          {u}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell sx={{ minWidth: 136, verticalAlign: "middle" }}>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ minWidth: 120 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                      $
                    </Typography>
                    <TextField
                      size="small"
                      type="number"
                      value={ing.costPer}
                      inputProps={{ min: 0, step: 0.01 }}
                      onChange={e => updateIngredient(ing.id, "costPer", e.target.value)}
                      sx={{ width: 96, flexShrink: 0 }}
                      placeholder="0.00"
                    />
                  </Stack>
                </TableCell>
                <TableCell sx={{ minWidth: 140, verticalAlign: "middle" }}>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ minWidth: 0 }}>
                    <TextField
                      size="small"
                      type="number"
                      value={ing.packageSize}
                      inputProps={{ min: 0.01, step: "any" }}
                      onChange={e => updateIngredient(ing.id, "packageSize", e.target.value)}
                      sx={{ minWidth: 72, width: 88, flexShrink: 0 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {ing.unit}
                    </Typography>
                  </Stack>
                </TableCell>
                {isScaled && (
                  <TableCell>
                    <Typography fontWeight={600} color="primary.main">
                      {ing.scaledQty % 1 === 0 ? ing.scaledQty : ing.scaledQty.toFixed(1)} {ing.unit}
                    </Typography>
                  </TableCell>
                )}
                {isScaled && (
                  <TableCell>
                    <Typography
                      fontWeight={600}
                      color={ing.pkgsNeeded > 0 ? "success.main" : "text.secondary"}
                    >
                      {ing.pkgsNeeded > 0 ? `x${ing.pkgsNeeded}` : "-"}
                    </Typography>
                  </TableCell>
                )}
                <TableCell>
                  <Typography
                    fontWeight={600}
                    color={ing.lineCost > 0 ? "text.primary" : "text.secondary"}
                  >
                    {ing.lineCost > 0 ? `$${ing.lineCost.toFixed(2)}` : "—"}
                  </Typography>
                </TableCell>
                <TableCell className="ingredient-col-share">
                  <Stack direction="row" alignItems="center" spacing={0.75} sx={{ minWidth: 0 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(ing.pctOfTotal, 100)}
                      sx={{
                        flex: "1 1 auto",
                        minWidth: 48,
                        height: 5,
                        borderRadius: 0,
                        bgcolor: workshopPalette.stone,
                        "& .MuiLinearProgress-bar": { bgcolor: "primary.main", borderRadius: 0 },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, width: 32, textAlign: "right" }}>
                      {ing.pctOfTotal.toFixed(0)}%
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell className="ingredient-col-remove" sx={{ px: 1.5, textAlign: "right", verticalAlign: "middle" }}>
                  <Button
                    size="small"
                    onClick={() => removeIngredient(ing.id)}
                    sx={{
                      textTransform: "none",
                      color: "primary.main",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      px: 1,
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </TableContainer>
            {rows.length > 0 && (
              <Box
                sx={{
                  flexShrink: 0,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 2,
                  rowGap: 1.5,
                  px: 2,
                  py: 2,
                  borderTop: `1px solid ${workshopPalette.stone}`,
                  bgcolor: "#fff",
                }}
              >
                <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", flexShrink: 0 }}>
                  {rows.length} ingredient{rows.length !== 1 ? "s" : ""}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={1.25}
                  sx={{ flexShrink: 0, flexWrap: "nowrap", whiteSpace: "nowrap" }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: workshopPalette.textMuted,
                      fontWeight: 700,
                    }}
                  >
                    Total Batch Cost
                  </Typography>
                  <Typography component="span" sx={{ fontWeight: 700, fontSize: "2rem", lineHeight: 1 }}>
                    ${totalCost.toFixed(2)}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Button
        fullWidth
        onClick={addIngredient}
        sx={{
          flexShrink: 0,
          mt: 0,
          py: 1.2,
          border: `2px dashed ${workshopPalette.accentLight}`,
          borderRadius: 2,
          bgcolor: "rgba(255, 232, 210, 0.45)",
          color: workshopPalette.brown,
          fontWeight: 600,
          textTransform: "none",
          fontFamily: t => t.typography.h6.fontFamily,
          "&:hover": {
            borderColor: "primary.main",
            color: "primary.main",
            bgcolor: "rgba(255, 201, 193, 0.4)",
          },
        }}
      >
        + Add Ingredient
      </Button>
    </Box>
  );
}
