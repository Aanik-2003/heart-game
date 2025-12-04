-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "lifelines" INTEGER NOT NULL DEFAULT 5,
    "maxLifelines" INTEGER NOT NULL DEFAULT 5,
    "nextRechargeUtc" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("createdAt", "email", "emailVerified", "id", "image", "lifelines", "maxLifelines", "name", "nextRechargeUtc", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "lifelines", "maxLifelines", "name", "nextRechargeUtc", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_user_2" ON "user"("email");
Pragma writable_schema=0;
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
