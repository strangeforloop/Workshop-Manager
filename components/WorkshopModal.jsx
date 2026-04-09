import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Tabs,
  Tab,
  TextField,
  Chip,
} from "@mui/material";
import { RsvpTab } from "./RsvpTab";
import { IngredientsBudgetTab } from "./IngredientsBudgetTab";
import { TimelineTab } from "./TimelineTab";
import { workshopPalette } from "../src/theme/workshopTheme";

export function WorkshopModal({
  workshop,
  onClose,
  onUpdate,
  onUpdateIngredients,
  onDelete,
  activeTab,
  setActiveTab,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const ws = workshop;

  const update = changes => onUpdate({ ...ws, ...changes });

  function addIngredient() {
    const newId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `tmp-${Date.now()}-${Math.random()}`;
    const newIngs = [
      ...ws.ingredients,
      { id: newId, name: "", baseQty: 0, unit: "g", costPer: 0, packageSize: 1 },
    ];
    onUpdateIngredients({ ...ws, ingredients: newIngs });
  }

  function updateIngredient(id, field, val) {
    const newIngs = ws.ingredients.map(i => (i.id === id ? { ...i, [field]: val } : i));
    onUpdateIngredients({ ...ws, ingredients: newIngs });
  }

  function removeIngredient(id) {
    const newIngs = ws.ingredients.filter(i => i.id !== id);
    onUpdateIngredients({ ...ws, ingredients: newIngs });
  }

  function toggleTimeline(section, id) {
    const tl = JSON.parse(JSON.stringify(ws.timeline));
    tl[section] = tl[section].map(item =>
      item.id === id ? { ...item, done: !item.done } : item,
    );
    onUpdate({ ...ws, timeline: tl });
  }

  function addTimelineItem(section, text) {
    if (!text.trim()) return;
    const tl = JSON.parse(JSON.stringify(ws.timeline));
    tl[section] = [...tl[section], { id: Date.now(), text, done: false }];
    onUpdate({ ...ws, timeline: tl });
  }

  function removeTimelineItem(section, id) {
    const tl = JSON.parse(JSON.stringify(ws.timeline));
    tl[section] = tl[section].filter(i => i.id !== id);
    onUpdate({ ...ws, timeline: tl });
  }

  const scale = ws.rsvpCount > 0 ? ws.rsvpCount / ws.baseServings : 1;
  const totalCost = ws.ingredients.reduce((s, i) => {
    const scaledQty = (parseFloat(i.baseQty) || 0) * scale;
    return s + (parseFloat(i.costPer) || 0) * scaledQty;
  }, 0);
  const costPerPerson =
    ws.rsvpCount > 0 ? totalCost / ws.rsvpCount : totalCost / ws.baseServings;
  const budgetLeft = ws.budget - totalCost;

  const formatDate = d => {
    if (!d) return "";
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const tabs = [
    { id: "rsvp", label: "RSVPs" },
    { id: "ingredients", label: "Ingredients & Budget" },
  ];

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: { xs: "100%", sm: "min(1320px, calc(100vw - 32px))" },
            height: { xs: "auto", sm: "min(920px, 94dvh)" },
            maxHeight: { xs: "90dvh", sm: "min(920px, 94dvh)" },
            minHeight: { xs: "auto", sm: "min(920px, 94dvh)" },
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            m: { xs: 1, sm: 1.5 },
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          borderBottom: `1px solid ${workshopPalette.stone}`,
          py: { xs: 2, sm: 1.5 },
          pb: { xs: 2, sm: 1.25 },
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography variant="h5">{ws.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {formatDate(ws.date)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
          <Button
            size="small"
            onClick={() => setConfirmDelete(true)}
            sx={{
              bgcolor: "#FFE8E8",
              color: "#a23434",
              border: "2px solid #F5C4C4",
              "&:hover": { bgcolor: "#FFD4D4" },
            }}
          >
            Delete
          </Button>
          <Button size="small" onClick={onClose} sx={{ color: "text.secondary", textTransform: "none" }}>
            Close
          </Button>
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: { xs: 2.5, sm: 1.5 },
          pb: { xs: 2, sm: 1.5 },
          minWidth: 0,
          minHeight: 0,
          overflowX: "auto",
          overflowY: activeTab === "ingredients" ? "hidden" : "auto",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            mt: { xs: 0.5, sm: 0 },
            mb: { xs: 2.5, sm: 1.25 },
            minHeight: 40,
            flexShrink: 0,
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 40,
              mr: 0.5,
              bgcolor: "rgba(237, 216, 205, 0.45)",
              color: workshopPalette.textMuted,
            },
            "& .MuiTab-root.Mui-selected": {
              bgcolor: workshopPalette.kimchi,
              color: "#fff",
            },
            "& .MuiTab-root:hover:not(.Mui-selected)": {
              bgcolor: "rgba(237, 216, 205, 0.72)",
            },
          }}
        >
          {tabs.map(t => (
            <Tab key={t.id} value={t.id} label={t.label} disableRipple />
          ))}
        </Tabs>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            overflow: activeTab === "ingredients" ? "hidden" : "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {activeTab === "rsvp" && <RsvpTab ws={ws} update={update} />}
          {activeTab === "ingredients" && (
            <IngredientsBudgetTab
              ws={ws}
              scale={scale}
              totalCost={totalCost}
              costPerPerson={costPerPerson}
              budgetLeft={budgetLeft}
              addIngredient={addIngredient}
              updateIngredient={updateIngredient}
              removeIngredient={removeIngredient}
            />
          )}
          {activeTab === "timeline" && (
            <TimelineTab
              ws={ws}
              toggleTimeline={toggleTimeline}
              addTimelineItem={addTimelineItem}
              removeTimelineItem={removeTimelineItem}
            />
          )}
        </Box>
      </DialogContent>

      {activeTab === "ingredients" && (
        <Box
          sx={{
            flexShrink: 0,
            px: 3,
            py: 2,
            borderTop: `1px solid ${workshopPalette.stone}`,
            bgcolor: workshopPalette.warmWhite,
          }}
        >
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="flex-end">
            <TextField
              label="Total Budget ($)"
              type="number"
              value={ws.budget}
              inputProps={{ min: 0, step: 5 }}
              onChange={e => update({ budget: parseFloat(e.target.value) || 0 })}
              sx={{ maxWidth: 160 }}
              InputLabelProps={{ sx: { fontWeight: 600 } }}
            />
            <TextField
              label="Base Recipe Serves"
              type="number"
              value={ws.baseServings}
              inputProps={{ min: 1 }}
              onChange={e => update({ baseServings: parseInt(e.target.value, 10) || 1 })}
              sx={{ minWidth: 200, maxWidth: 220 }}
              InputLabelProps={{ sx: { fontWeight: 600, whiteSpace: "nowrap" } }}
            />
            {ws.budget > 0 && (
              <Chip
                label={
                  budgetLeft < 0
                    ? `$${Math.abs(budgetLeft).toFixed(2)} over budget`
                    : `$${budgetLeft.toFixed(2)} under budget`
                }
                sx={{
                  mb: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: budgetLeft < 0 ? "#FEF0E8" : workshopPalette.greenLight,
                  color: budgetLeft < 0 ? "primary.main" : "success.main",
                }}
              />
            )}
          </Stack>
        </Box>
      )}

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete workshop?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>{ws.name}</strong> will be permanently deleted. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button
            onClick={() => { setConfirmDelete(false); onDelete(); }}
            sx={{ bgcolor: "#FFE8E8", color: "#a23434", border: "2px solid #F5C4C4", "&:hover": { bgcolor: "#FFD4D4" } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
