import { useState, useEffect, useRef } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
  Chip,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  loadWorkshops,
  saveWorkshops,
  createWorkshopFromForm,
  deleteWorkshopById,
} from "./data/workshops";
import { workshopPalette, workshopCardHeaderBg } from "./theme/workshopTheme";
import { CreateModal } from "./components/CreateModal";
import { WorkshopModal } from "./components/WorkshopModal";
import { WorkshopTypeCards } from "./components/WorkshopTypeCards";

export default function App() {
  const [workshops, setWorkshops] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [activeTab, setActiveTab] = useState("rsvp");
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState("idle");
  const workshopsRef = useRef([]);
  workshopsRef.current = workshops;

  useEffect(() => {
    let cancelled = false;
    loadWorkshops().then(data => {
      if (cancelled) return;
      setWorkshops(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    setSyncStatus("saving");
    const t = setTimeout(async () => {
      const snapshot = workshopsRef.current;
      const ok = await saveWorkshops(snapshot);
      setSyncStatus(ok ? "saved" : "error");
      if (ok) setTimeout(() => setSyncStatus("idle"), 2000);
    }, 600);
    return () => clearTimeout(t);
  }, [workshops, loading]);

  function createWorkshop(form) {
    setWorkshops(prev => {
      const ws = createWorkshopFromForm(form, prev.length % 4);
      return [ws, ...prev];
    });
    setShowCreate(false);
  }

  function updateWorkshop(updated) {
    setWorkshops(prev => prev.map(w => (w.id === updated.id ? updated : w)));
    setActiveWorkshop(updated);
  }

  function updateWorkshopIngredients(updated) {
    const withIds = {
      ...updated,
      ingredients: updated.ingredients.map(i => ({
        ...i,
        id:
          i.id ||
          (typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `i-${Date.now()}-${Math.random()}`),
      })),
    };
    setWorkshops(prev => prev.map(w => (w.id === withIds.id ? withIds : w)));
    setActiveWorkshop(withIds);
  }

  async function deleteWorkshop(id) {
    setWorkshops(prev => prev.filter(w => w.id !== id));
    setActiveWorkshop(null);
    setSyncStatus("saving");
    const ok = await deleteWorkshopById(id);
    setSyncStatus(ok ? "saved" : "error");
    if (ok) setTimeout(() => setSyncStatus("idle"), 2000);
  }

  const formatDate = d => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredWorkshops = workshops.filter(ws => {
    const matchesQuery =
      ws.name.toLowerCase().includes(query.toLowerCase()) ||
      formatDate(ws.date).toLowerCase().includes(query.toLowerCase());

    const dateObj = ws.date ? new Date(`${ws.date}T00:00:00`) : null;
    const isPast = dateObj ? dateObj < today : false;

    const matchesFilter = filter === "all" || (filter === "past" && isPast);

    return matchesQuery && matchesFilter;
  });

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: 2,
            color: "text.secondary",
          }}
        >
          <CircularProgress sx={{ color: "primary.main" }} />
          <Typography>Loading your workshops...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth={false} sx={{ py: 2.5, px: { xs: 2, sm: 4, md: 5 } }}>
        <Box sx={{ px: 0, pt: 2.25, pb: 1.8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              width: "100%",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "2rem" }}>
                Cooking Workshop Manager
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ sm: "center" }}
              sx={{
                ml: { sm: "auto" },
                width: { xs: "100%", sm: "auto" },
                justifyContent: { sm: "flex-end" },
              }}
            >
              <TextField
                size="small"
                placeholder="Search workshops..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                sx={{
                  minWidth: { xs: 260, sm: 280 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "999px",
                    background: "#f8f6f3",
                  },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">⌕</InputAdornment>,
                }}
              />
              <Button
                variant="contained"
                onClick={() => setShowCreate(true)}
                sx={{
                  borderRadius: "999px",
                  bgcolor: workshopPalette.tealSolid,
                  px: 2.7,
                  py: 0.95,
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#4b8f6a" },
                }}
              >
                + New Workshop
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* <Box sx={{ px: 0, pt: 3.2 }}>
            <Typography
              sx={{
                color: workshopPalette.tealSolid,
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                mb: 0.2,
              }}
            >
              Overview
            </Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: "2rem", sm: "2.4rem" }, lineHeight: 1.1 }}>
              How can we help, Alex?
            </Typography>
        </Box>

        <Box sx={{ px: 0, pt: 2.2 }}>
          <WorkshopTypeCards />
        </Box> */}

        <Box sx={{ px: 0, pt: 0.5, pb: 2.2 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontSize: { xs: "1.15rem", sm: "1.25rem" },
              fontWeight: 700,
              lineHeight: 1.3,
              color: "text.primary",
            }}
          >
            Your Workshops
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ px: 0, mb: 3 }}>
          {[
            { id: "all", label: "All" },
            { id: "past", label: "Past" },
          ].map(f => (
            <Button
              key={f.id}
              size="small"
              onClick={() => setFilter(f.id)}
              sx={{
                borderRadius: "999px",
                px: 2,
                bgcolor: filter === f.id ? workshopPalette.text : "#f3f0ec",
                color: filter === f.id ? "#fff" : workshopPalette.textMuted,
                border: "1px solid #eee5de",
                "&:hover": {
                  bgcolor: filter === f.id ? workshopPalette.text : "#ece4dc",
                },
              }}
            >
              {f.label}
            </Button>
          ))}
          </Stack>

        {workshops.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10, color: "text.secondary", px: 0 }}>
            <Typography variant="h5" sx={{ mb: 1, color: "text.primary" }}>
              No workshops yet
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setShowCreate(true)} sx={{ mt: 1 }}>
              + Create Workshop
            </Button>
            </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 2.5,
              px: 0,
              pb: 3.5,
            }}
          >
            {filter !== "past" && <Card
              onClick={() => setShowCreate(true)}
              sx={{
                cursor: "pointer",
                minHeight: 340,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #d5cbc2",
                borderRadius: "24px",
                bgcolor: "#fbf8f4",
                boxShadow: "0 0 0 3px rgba(255, 201, 193, 0.32), 0 10px 26px rgba(217, 78, 31, 0.12)",
                "&:hover": {
                  borderColor: workshopPalette.accent,
                  bgcolor: "#f7f2ed",
                  boxShadow: "0 0 0 4px rgba(255, 201, 193, 0.46), 0 14px 30px rgba(217, 78, 31, 0.2)",
                },
              }}
            >
              <Box sx={{ textAlign: "center", color: "text.secondary" }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "#f2ede8",
                    mx: "auto",
                    mb: 1.5,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  +
                </Box>
                <Typography
                  sx={{
                    fontFamily: t => t.typography.h5.fontFamily,
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  New Workshop
                </Typography>
              </Box>
            </Card>}
            {filteredWorkshops.map(ws => {
              const scale = ws.rsvpCount > 0 ? ws.rsvpCount / ws.baseServings : 1;
              const totalCost = ws.ingredients.reduce(
                (s, i) =>
                  s +
                  (parseFloat(i.costPer) || 0) * (parseFloat(i.baseQty) || 0) * scale,
                0,
              );
              const overBudget = ws.budget > 0 && totalCost > ws.budget;
              const pct =
                ws.capacity > 0 ? Math.min((ws.rsvpCount / ws.capacity) * 100, 100) : 0;
              const headerBg = workshopCardHeaderBg(ws.cardAccentIndex);
              return (
                <Card
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkshop(ws);
                    setActiveTab("rsvp");
                  }}
                  sx={{
                    borderRadius: "34px",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: workshopPalette.shadowLg,
                      borderColor: `${workshopPalette.accentLight} !important`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.2, "&:last-child": { pb: 2.2 } }}>
                    <Box
                      sx={{
                        mb: 2.2,
                        p: 2,
                        pt: 3.25,
                        pb: 2.75,
                        minHeight: 176,
                        background: headerBg,
                        borderRadius: "18px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Chip
                        label={`📅 ${formatDate(ws.date)}`}
                        size="small"
                        sx={{
                          alignSelf: "flex-start",
                          bgcolor: "rgba(255,255,255,0.55)",
                          color: workshopPalette.tealSolid,
                          fontWeight: 600,
                          border: "1px solid rgba(90, 158, 122, 0.25)",
                          borderRadius: 2,
                          height: "auto",
                          "& .MuiChip-label": {
                            px: 1,
                            py: 0.5,
                          },
                        }}
                      />
                      <Typography variant="h5" sx={{ lineHeight: 1.2, mt: 2 }}>
                        {ws.name}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: t => t.typography.h5.fontFamily,
                            fontWeight: 700,
                            color: workshopPalette.teal,
                          }}
                        >
                          {ws.rsvpCount}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#8f7d70",
                            fontWeight: 600,
                            mt: 0.5,
                          }}
                        >
                          RSVPs
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: t => t.typography.h5.fontFamily,
                            fontWeight: 700,
                            color: workshopPalette.teal,
                          }}
                        >
                          {ws.capacity}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#8f7d70",
                            fontWeight: 600,
                            mt: 0.5,
                          }}
                        >
                          Capacity
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: t => t.typography.h5.fontFamily,
                            fontWeight: 700,
                            color: overBudget ? "primary.main" : "text.primary",
                          }}
                        >
                          {totalCost > 0 ? `$${totalCost.toFixed(0)}` : "—"}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#8f7d70",
                            fontWeight: 600,
                            mt: 0.5,
                          }}
                        >
                          {overBudget
                            ? "Over budget"
                            : ws.budget > 0
                              ? `of $${ws.budget}`
                              : "Est. cost"}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={pct}
                        sx={{
                          height: 12,
                          borderRadius: 2,
                          bgcolor: "rgba(237, 216, 205, 0.55)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 2,
                            background: pct < 50 ? "#f5c596" : "#df8aa2",
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {Math.round(pct)}% full
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>

      {showCreate && (
        <CreateModal onClose={() => setShowCreate(false)} onCreate={createWorkshop} />
      )}

      {activeWorkshop && (
        <WorkshopModal
          workshop={activeWorkshop}
          onClose={() => setActiveWorkshop(null)}
          onUpdate={updateWorkshop}
          onUpdateIngredients={updateWorkshopIngredients}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onDelete={() => deleteWorkshop(activeWorkshop.id)}
        />
      )}
    </Box>
  );
}
