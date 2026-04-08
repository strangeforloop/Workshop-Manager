import { supabase, hasSupabaseConfig } from "./supabaseClient";

function uuid() {
  // Supabase tables are commonly UUID-based; prefer valid UUIDs for inserts.
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random()}`; // fallback (may not satisfy UUID columns)
}

function toWorkshopRow(ws) {
  return {
    id: ws.id,
    name: ws.name,
    date: ws.date,
    capacity: ws.capacity,
    budget: ws.budget,
    rsvp_count: ws.rsvpCount,
    base_servings: ws.baseServings,
    timeline: ws.timeline,
  };
}

function toIngredientRows(ws) {
  return (ws.ingredients || []).map(i => ({
    id: i.id,
    workshop_id: ws.id,
    name: i.name,
    base_qty: i.baseQty,
    unit: i.unit,
    cost_per: i.costPer,
    package_size: i.packageSize,
  }));
}

function fromWorkshopRow(row) {
  return {
    id: row.id,
    name: row.name,
    date: row.date,
    capacity: row.capacity ?? 0,
    budget: row.budget ?? 0,
    rsvpCount: row.rsvp_count ?? row.rsvpCount ?? 0,
    baseServings: row.base_servings ?? row.baseServings ?? 1,
    timeline: row.timeline ?? JSON.parse(JSON.stringify(DEFAULT_TIMELINE)),
    ingredients: [],
  };
}

function fromIngredientRow(row) {
  return {
    id: row.id,
    name: row.name,
    baseQty: row.base_qty ?? row.baseQty ?? 0,
    unit: row.unit ?? "g",
    costPer: row.cost_per ?? row.costPer ?? 0,
    packageSize: row.package_size ?? row.packageSize ?? 1,
  };
}

export async function loadWorkshops() {
  if (!hasSupabaseConfig || !supabase) {
    // No Supabase config present — render an empty list instead of crashing.
    return [];
  }
  const { data: wsRows, error: wsErr } = await supabase
    .from("workshops")
    .select("*")
    .order("date", { ascending: true });

  if (wsErr) {
    // eslint-disable-next-line no-console
    console.error("Failed to load workshops", wsErr);
    return [];
  }

  const workshops = (wsRows || []).map(fromWorkshopRow);
  const ids = workshops.map(w => w.id).filter(Boolean);
  if (ids.length === 0) return workshops;

  const { data: ingRows, error: ingErr } = await supabase
    .from("ingredients")
    .select("*")
    .in("workshop_id", ids);

  if (ingErr) {
    // eslint-disable-next-line no-console
    console.error("Failed to load ingredients", ingErr);
    return workshops;
  }

  const ingByWorkshop = new Map();
  for (const r of ingRows || []) {
    const wid = r.workshop_id ?? r.workshopId;
    if (!ingByWorkshop.has(wid)) ingByWorkshop.set(wid, []);
    ingByWorkshop.get(wid).push(fromIngredientRow(r));
  }

  return workshops.map(w => ({ ...w, ingredients: ingByWorkshop.get(w.id) || [] }));
}

export async function saveWorkshops(workshops) {
  if (!hasSupabaseConfig || !supabase) {
    // In local/dev without Supabase, pretend save succeeded so UI stays responsive.
    return true;
  }
  try {
    const wsRows = (workshops || []).map(toWorkshopRow);
    const { error: wsErr } = await supabase.from("workshops").upsert(wsRows);
    if (wsErr) throw wsErr;

    const ingredientRows = (workshops || []).flatMap(toIngredientRows);

    // Remove ingredients that were deleted locally.
    const workshopIds = (workshops || []).map(w => w.id).filter(Boolean);
    if (workshopIds.length > 0) {
      const { data: existing, error: exErr } = await supabase
        .from("ingredients")
        .select("id,workshop_id")
        .in("workshop_id", workshopIds);
      if (exErr) throw exErr;

      const keep = new Set(ingredientRows.map(r => r.id));
      const toDelete = (existing || [])
        .map(r => r.id)
        .filter(id => id && !keep.has(id));

      if (toDelete.length > 0) {
        const { error: delErr } = await supabase.from("ingredients").delete().in("id", toDelete);
        if (delErr) throw delErr;
      }
    }

    if (ingredientRows.length > 0) {
      const { error: ingErr } = await supabase.from("ingredients").upsert(ingredientRows);
      if (ingErr) throw ingErr;
    }

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to save workshops", e);
    return false;
  }
}

export async function deleteWorkshopById(workshopId) {
  if (!hasSupabaseConfig || !supabase) {
    return true;
  }
  try {
    // If you have ON DELETE CASCADE on ingredients.workshop_id, the ingredients delete is redundant.
    await supabase.from("ingredients").delete().eq("workshop_id", workshopId);
    const { error } = await supabase.from("workshops").delete().eq("id", workshopId);
    if (error) throw error;
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to delete workshop", e);
    return false;
  }
}

export const DEFAULT_TIMELINE = {
  week: [
    { id: 1, text: "Confirm venue and send reminders to RSVPs", done: false },
    { id: 2, text: "Order all non-perishable ingredients", done: false },
    { id: 3, text: "Prepare printed recipe cards or handouts", done: false },
  ],
  day_before: [
    { id: 4, text: "Shop for fresh/perishable ingredients", done: false },
    { id: 5, text: "Prep mise en place: chop, measure, portion", done: false },
    { id: 6, text: "Set up workstations and equipment", done: false },
  ],
  day_of: [
    { id: 7, text: "Arrive 1hr early to set up", done: false },
    { id: 8, text: "Preheat ovens, prepare water baths, etc.", done: false },
    { id: 9, text: "Welcome attendees and distribute materials", done: false },
  ],
};

export function createWorkshopFromForm(form) {
  const idBase = uuid();
  return {
    id: idBase,
    name: form.name,
    date: form.date,
    capacity: parseInt(form.capacity, 10) || 20,
    budget: parseFloat(form.budget) || 0,
    rsvpCount: 0,
    baseServings: 4,
    timeline: JSON.parse(JSON.stringify(DEFAULT_TIMELINE)),
    ingredients: [],
  };
}

