-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vocab" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meaning" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "vocabulary" TEXT NOT NULL,
    "type" TEXT,
    "gotIt" BOOLEAN DEFAULT false,
    "favorite" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_vocab" ("createdAt", "example", "favorite", "gotIt", "id", "meaning", "type", "vocabulary") SELECT "createdAt", "example", "favorite", "gotIt", "id", "meaning", "type", "vocabulary" FROM "vocab";
DROP TABLE "vocab";
ALTER TABLE "new_vocab" RENAME TO "vocab";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
