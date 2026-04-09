import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { workshopPalette } from "../src/theme/workshopTheme";

export function CreateModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: "", date: "", capacity: "", budget: "" });
  const valid = form.name.trim() && form.date;

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${workshopPalette.stone}`,
          pb: 2,
        }}
      >
        <Typography variant="h5" component="span">
          Create Workshop
        </Typography>
        <Button onClick={onClose} sx={{ color: "text.secondary", textTransform: "none" }}>
          Close
        </Button>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 3 }}>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField
            label="Workshop Name"
            placeholder="e.g. Fresh Pasta Making with Friends"
            autoFocus
            fullWidth
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            InputLabelProps={{ sx: { fontFamily: t => t.typography.subtitle2.fontFamily, fontWeight: 600 } }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              InputLabelProps={{ shrink: true, sx: { fontWeight: 600 } }}
            />
            <TextField
              label="Max Capacity"
              type="number"
              fullWidth
              placeholder="0"
              value={form.capacity}
              onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
              InputLabelProps={{ sx: { fontWeight: 600 } }}
            />
          </Stack>
          <TextField
            label="Budget ($)"
            type="number"
            fullWidth
            placeholder="150.00"
            value={form.budget}
            onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
            helperText="Total budget for ingredients and supplies"
            InputLabelProps={{ sx: { fontWeight: 600 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${workshopPalette.stone}` }}>
        <Button
          onClick={onClose}
          sx={{
            bgcolor: workshopPalette.stone,
            color: "text.primary",
            border: "2px solid rgba(212, 184, 168, 0.6)",
            "&:hover": { bgcolor: workshopPalette.tan },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!valid}
          onClick={() => valid && onCreate(form)}
          sx={{
            boxShadow: "0 4px 0 rgba(180, 80, 72, 0.35)",
            "&:hover": { boxShadow: "0 4px 0 rgba(180, 80, 72, 0.35)" },
          }}
        >
          Create Workshop
        </Button>
      </DialogActions>
    </Dialog>
  );
}
