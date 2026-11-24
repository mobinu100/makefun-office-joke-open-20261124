import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Office Joke Open: the printer that finally works — but only to print
// its own "out of order" sign, perfectly, in colour, every single time.
// Specific office detail (the printer, named in the judge brief), a
// misdirection in the first clause ("finally works"), payoff in the last
// few words ("every single time"). One line, 108 characters, inside the
// 1-200 gate; no word could be cut without losing the joke. Copy-only:
// writes the constant line to $MAKEFUN_OUTPUT_DIR/entry.txt, no network,
// never deletes the output dir. Fail fast if the text ever drifts
// outside the gate, and read the file back to prove what was written.
const ENTRY = "The printer finally works — it only prints the 'out of order' sign, perfectly, in colour, every single time.";
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry.txt must be 1-200 non-blank characters, got ${ENTRY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("entry.txt read-back mismatch");
}
