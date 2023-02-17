-- CreateTable
CREATE TABLE "NewbieCorner" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "heading" VARCHAR(255) NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "user_id" UUID,
    "newbieTag_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "NewbieCorner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newbieTag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "newbieTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewbieCorner" ADD CONSTRAINT "NewbieCorner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewbieCorner" ADD CONSTRAINT "NewbieCorner_newbieTag_id_fkey" FOREIGN KEY ("newbieTag_id") REFERENCES "newbieTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
