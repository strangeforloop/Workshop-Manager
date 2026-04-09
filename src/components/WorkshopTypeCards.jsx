import { useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { workshopPalette } from "../theme/workshopTheme";

const WORKSHOP_TYPES = [
  { id: "cooking", label: "Cooking", icon: "🍳", iconBg: "#FCE7E6" },
  { id: "arts", label: "Arts", icon: "🎨", iconBg: "#F8E9D2" },
  { id: "tech", label: "Tech", icon: "💻", iconBg: "#E7EEFF" },
  { id: "garden", label: "Garden", icon: "🌱", iconBg: "#DFF3E9" },
  { id: "music", label: "Music", icon: "🎵", iconBg: "#ECE1FF" },
];

export function WorkshopTypeCards() {
  const [selected, setSelected] = useState("arts");

  return (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
      {WORKSHOP_TYPES.map(type => {
        const isSelected = selected === type.id;
        return (
          <Button
            key={type.id}
            onClick={() => setSelected(type.id)}
            sx={{
              width: 96,
              height: 96,
              p: 1.25,
              borderRadius: "20px",
              border: `2px solid ${isSelected ? workshopPalette.tealSolid : "#EFE9E2"}`,
              background: isSelected ? "#FCFAF8" : "#fff",
              boxShadow: isSelected ? "0 4px 16px rgba(90, 62, 66, 0.08)" : "none",
              color: workshopPalette.text,
              textTransform: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
              "&:hover": {
                background: "#FCFAF8",
                borderColor: workshopPalette.tealSolid,
              },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "12px",
                bgcolor: type.iconBg,
                display: "grid",
                placeItems: "center",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              {type.icon}
            </Box>
            <Typography sx={{ fontSize: "0.88rem", fontWeight: 600, lineHeight: 1 }}>
              {type.label}
            </Typography>
          </Button>
        );
      })}
    </Stack>
  );
}

