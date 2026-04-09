import { useState } from "react";
import { Box, Typography, Stack, TextField, Button, Checkbox } from "@mui/material";
import { workshopPalette } from "../src/theme/workshopTheme";

export function TimelineTab({ ws, toggleTimeline, addTimelineItem, removeTimelineItem }) {
  const [inputs, setInputs] = useState({ week: "", day_before: "", day_of: "" });

  const sections = [
    { key: "week", label: "1 Week Before" },
    { key: "day_before", label: "Day Before" },
    { key: "day_of", label: "Day Of" },
  ];

  const doneCount = sections.reduce(
    (s, sec) => s + ws.timeline[sec.key].filter(i => i.done).length,
    0,
  );
  const totalCount = sections.reduce((s, sec) => s + ws.timeline[sec.key].length, 0);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: workshopPalette.brown, fontWeight: 600, letterSpacing: "0.04em" }}
        >
          Prep Checklist
        </Typography>
        <ChipMui doneCount={doneCount} totalCount={totalCount} />
      </Stack>

      {sections.map(sec => (
        <Box key={sec.key} sx={{ mb: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              mb: 1.5,
              pb: 1,
              borderBottom: `1px dashed ${workshopPalette.tan}`,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "primary.main",
                flexShrink: 0,
              }}
            />
            <Typography variant="subtitle1" fontWeight={700} color={workshopPalette.brown}>
              {sec.label}
            </Typography>
          </Stack>
          {ws.timeline[sec.key].map(item => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="flex-start"
              spacing={1.5}
              sx={{
                p: 1.25,
                mb: 0.5,
                borderRadius: 2,
                bgcolor: "#fff",
                border: `2px solid rgba(237, 216, 205, 0.9)`,
              }}
            >
              <Checkbox
                checked={item.done}
                onChange={() => toggleTimeline(sec.key, item.id)}
                sx={{
                  p: 0,
                  mt: 0.25,
                  color: workshopPalette.tan,
                  "&.Mui-checked": { color: "success.main" },
                }}
              />
              <Typography
                sx={{
                  flex: 1,
                  pt: 0.5,
                  textDecoration: item.done ? "line-through" : "none",
                  color: item.done ? "text.secondary" : "text.primary",
                }}
              >
                {item.text}
              </Typography>
              <Button size="small" onClick={() => removeTimelineItem(sec.key, item.id)} sx={{ textTransform: "none" }}>
                Remove
              </Button>
            </Stack>
          ))}
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder={`Add task for "${sec.label}"...`}
              value={inputs[sec.key]}
              onChange={e => setInputs(prev => ({ ...prev, [sec.key]: e.target.value }))}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  addTimelineItem(sec.key, inputs[sec.key]);
                  setInputs(prev => ({ ...prev, [sec.key]: "" }));
                }
              }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                addTimelineItem(sec.key, inputs[sec.key]);
                setInputs(prev => ({ ...prev, [sec.key]: "" }));
              }}
              sx={{
                borderColor: workshopPalette.stone,
                color: "text.primary",
                borderWidth: 2,
                textTransform: "none",
                flexShrink: 0,
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

function ChipMui({ doneCount, totalCount }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        fontSize: "0.85rem",
        fontWeight: 600,
        bgcolor: workshopPalette.greenLight,
        color: "success.main",
      }}
    >
      {doneCount} / {totalCount} complete
    </Box>
  );
}
