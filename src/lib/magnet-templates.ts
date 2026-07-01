// Full letter-size sheet (8.5" × 11") at 300 DPI
// 2 columns × 3 rows = 6 magnets per sheet

export interface MagnetTemplate {
    id: string;
    name: string;
    description: string;
    cols: number;
    rows: number;
    photoCount: number;
    // Sheet dimensions at 300 DPI
    sheetWidthPx: number;
    sheetHeightPx: number;
    // Spacing
    marginPx: number;
    colGutterPx: number;
    rowGutterPx: number;
    // Per-magnet strip sizes (at 300 DPI)
    topStripPx: number;
    bottomStripPx: number;
    leftStripPx: number;
    rightStripPx: number;
    // Photo crop aspect ratio (width / height)
    photoAspectRatio: number;
}

// Computed magnet dimensions for the classic-6up template
const SHEET_W = 2550; // 8.5" × 300
const SHEET_H = 3300; // 11"  × 300
const MARGIN = 75;    // 0.25"
const COL_GUT = 30;   // 0.1"
const ROW_GUT = 45;   // 0.15"
const TOP = 130;
const BOT = 100;
const LEFT = 120;
const RIGHT = 120;

const MAG_W = (SHEET_W - 2 * MARGIN - COL_GUT) / 2; // 1185
const MAG_H = (SHEET_H - 2 * MARGIN - 2 * ROW_GUT) / 3; // 1020

export const TEMPLATES: MagnetTemplate[] = [
    {
        id: "classic-6up",
        name: "Classic 6-Up",
        description: "6 matching magnets on a full letter-size sheet",
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
        photoAspectRatio: (MAG_W - LEFT - RIGHT) / (MAG_H - TOP - BOT), // 945/790 ≈ 1.196
    },
];

export const DEFAULT_TEMPLATE = TEMPLATES[0];
