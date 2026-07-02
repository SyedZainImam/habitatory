// Full letter sheet (8.5" × 11") at 300 DPI, 2 columns × 3 rows = 6 magnets
// Photo slot: exactly 2.5" × 2.5" (750 × 750 px) — square crop

export interface MagnetTemplate {
    id: string;
    name: string;
    description: string;
    cols: number;
    rows: number;
    photoCount: number;
    // Sheet at 300 DPI
    sheetWidthPx: number;
    sheetHeightPx: number;
    // Spacing
    marginPx: number;
    colGutterPx: number;
    rowGutterPx: number;
    // Per-magnet strips (at 300 DPI)
    topStripPx: number;     // "Habitatory" heading
    bottomStripPx: number;  // Instagram handle
    leftStripPx: number;    // email (rotated −90°)
    rightStripPx: number;   // website (rotated +90°)
    // Photo crop aspect ratio (width / height) — 1.0 = square
    photoAspectRatio: number;
}

// ── Sheet ────────────────────────────────────────────────────────────────────
const SHEET_W = 2550;  // 8.5" × 300 DPI
const SHEET_H = 3300;  // 11"  × 300 DPI
const MARGIN  = 75;    // 0.25" border on all sides
const COL_GUT = 30;    // 0.10" between 2 columns
const ROW_GUT = 45;    // 0.15" between 3 rows (2 gutters)

// ── Per-magnet dimensions ────────────────────────────────────────────────────
const MAG_W = (SHEET_W - 2 * MARGIN - COL_GUT) / 2;      // 1185 px = 3.95"
const MAG_H = (SHEET_H - 2 * MARGIN - 2 * ROW_GUT) / 3;  // 1020 px = 3.40"

// ── Photo slot: 2.5" × 2.5" = 750 × 750 px (square) ─────────────────────────
const PHOTO_PX = 750;

const LEFT  = Math.floor((MAG_W - PHOTO_PX) / 2);  // 217 px = 0.72"
const RIGHT = LEFT;                                   // 217 px (symmetric)
const V_REM = Math.round(MAG_H - PHOTO_PX);          // 270 px remaining vertically
const TOP   = Math.round(V_REM * 0.60);              // 162 px = 0.54" (heading)
const BOT   = V_REM - TOP;                           // 108 px = 0.36" (footer)

export const TEMPLATES: MagnetTemplate[] = [
    {
        id: "classic-6up",
        name: "Classic 6-Up",
        description: "6 magnets on letter paper · 2.5\" × 2.5\" photos",
        cols: 2,
        rows: 3,
        photoCount: 6,
        sheetWidthPx: SHEET_W,
        sheetHeightPx: SHEET_H,
        marginPx: MARGIN,
        colGutterPx: COL_GUT,
        rowGutterPx: ROW_GUT,
        topStripPx: TOP,
        bottomStripPx: BOT,
        leftStripPx: LEFT,
        rightStripPx: RIGHT,
        photoAspectRatio: 1.0, // 2.5" × 2.5" — square crop
    },
];

export const DEFAULT_TEMPLATE = TEMPLATES[0];
