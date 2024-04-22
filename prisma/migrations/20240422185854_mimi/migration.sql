-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vocab" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meaning" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "vocabulary" TEXT NOT NULL,
    "type" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_vocab" ("createdAt", "example", "id", "meaning", "type", "vocabulary") SELECT "createdAt", "example", "id", "meaning", "type", "vocabulary" FROM "vocab";
DROP TABLE "vocab";
ALTER TABLE "new_vocab" RENAME TO "vocab";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
