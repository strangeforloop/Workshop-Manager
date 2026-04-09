import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  LinearProgress,
  Divider,
} from "@mui/material";
import { workshopPalette } from "../src/theme/workshopTheme";

export function RsvpTab({ ws, update }) {
  // const [partifulUrl, setPartifulUrl] = useState("");
  // const [showPartiful, setShowPartiful] = useState(false);
  const pct =
    ws.capacity > 0 ? Math.min((ws.rsvpCount / ws.capacity) * 100, 100) : 0;

  return (
    <Box>
      {/* Partiful Integration — commented out (no public API)
      <Box
        sx={{
          background: "#6A9B7D",
          borderRadius: 2,
          px: 2.5,
          py: 2,
          border: "3px solid rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Box sx={{ color: "#fff" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Partiful Integration
          </Typography>
          <Typography sx={{ mt: 0.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
            Connect your Partiful event to sync RSVPs automatically
          </Typography>
        </Box>
        <Button
          type="button"
          onClick={() => setShowPartiful(!showPartiful)}
          sx={{
            bgcolor: "rgba(255,255,255,0.22)",
            border: "2px solid rgba(255,255,255,0.4)",
            color: "#fff",
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
          }}
        >
          Connect Partiful
        </Button>
      </Box>

      {showPartiful && (
        <Box
          sx={{
            bgcolor: workshopPalette.tealSolid,
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}>
            Connect Partiful Event
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.92)", mb: 1.5, lineHeight: 1.55 }}>
            Paste your Partiful event link below. Once connected, RSVP count syncs automatically.
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <TextField
              size="small"
              placeholder="https://partiful.com/e/..."
              value={partifulUrl}
              onChange={e => setPartifulUrl(e.target.value)}
              sx={{
                flex: 1,
                minWidth: 180,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.98)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.45)" },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (partifulUrl) {
                  alert(
                    "Partiful connected. In a full integration, RSVPs would sync automatically. For now, update manually below.",
                  );
                  setShowPartiful(false);
                }
              }}
            >
              Connect
            </Button>
          </Stack>
          <Typography variant="caption" sx={{ display: "block", mt: 1, color: "rgba(255,255,255,0.82)" }}>
            Note: Full Partiful API integration requires OAuth — this demo shows the UI flow. RSVPs can be set
            manually below.
          </Typography>
        </Box>
      )}
      */}

      <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap sx={{ mb: 3, alignItems: "center" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography component="label" sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
            RSVP Count:
          </Typography>
          <Stack
            direction="row"
            alignItems="stretch"
            sx={{
              border: `2px solid ${workshopPalette.stone}`,
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
            <Button
              sx={{ minWidth: 36, borderRadius: 0, bgcolor: workshopPalette.stone, color: "text.primary" }}
              onClick={() => update({ rsvpCount: Math.max(0, ws.rsvpCount - 1) })}
            >
              -
            </Button>
            <Box
              sx={{
                minWidth: 48,
                textAlign: "center",
                fontWeight: 700,
                lineHeight: "36px",
                bgcolor: "#fff",
              }}
            >
              {ws.rsvpCount}
            </Box>
            <Button
              sx={{ minWidth: 36, borderRadius: 0, bgcolor: workshopPalette.stone, color: "text.primary" }}
              onClick={() => update({ rsvpCount: Math.min(ws.capacity, ws.rsvpCount + 1) })}
            >
              +
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {ws.rsvpCount} / {ws.capacity} spots filled
            </Typography>
            {/* <Typography variant="body2" fontWeight={600}>
              {Math.round(pct)}%
            </Typography> */}
          </Stack>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              height: 10,
              borderRadius: 2,
              bgcolor: "rgba(237, 216, 205, 0.65)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 2,
                background: `linear-gradient(90deg, ${workshopPalette.accent} 0%, ${workshopPalette.teal} 100%)`,
              },
            }}
          />
        </Box>
      </Stack>

      <Divider sx={{ my: 2, bgcolor: workshopPalette.stone }} />

      <Typography
        variant="subtitle2"
        sx={{ color: workshopPalette.brown, fontWeight: 600, letterSpacing: "0.04em", mb: 2 }}
      >
        Workshop Details
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Max Capacity"
          type="number"
          fullWidth
          value={ws.capacity}
          onChange={e => update({ capacity: parseInt(e.target.value, 10) || 0 })}
          InputLabelProps={{ sx: { fontWeight: 600 } }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={ws.date}
          onChange={e => update({ date: e.target.value })}
          InputLabelProps={{ shrink: true, sx: { fontWeight: 600 } }}
        />
      </Stack>
      <TextField
        label="Base Recipe Serves"
        type="number"
        fullWidth
        value={ws.baseServings}
        onChange={e => update({ baseServings: parseInt(e.target.value, 10) || 1 })}
        helperText="All ingredient quantities are based on this many servings. They'll auto-scale to your RSVP count."
        InputLabelProps={{ sx: { fontWeight: 600 } }}
        sx={{ mb: 1 }}
      />

      {ws.rsvpCount > 0 && (
        <Box
          sx={{
            mt: 1,
            p: 2,
            bgcolor: workshopPalette.cream,
            border: `1px solid ${workshopPalette.stone}`,
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">
            <strong>Scale factor: {(ws.rsvpCount / ws.baseServings).toFixed(2)}x</strong> — ingredients will be
            multiplied by this amount
          </Typography>
        </Box>
      )}
    </Box>
  );
}
