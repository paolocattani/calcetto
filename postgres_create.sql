CREATE TABLE "auth_user" (
	"id" serial NOT NULL,
	"name" varchar(255),
	"surname" varchar(255),
	"alias" varchar(255),
	"role" bigint NOT NULL,
	CONSTRAINT "auth_user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "auth_role" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"admin" BOOLEAN NOT NULL,
	"read_only" BOOLEAN NOT NULL,
	CONSTRAINT "auth_role_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app_tournament" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"owner" bigint NOT NULL,
	"progress" bigint,
	"public" BOOLEAN NOT NULL DEFAULT 'false',
	"auto_sort" BOOLEAN NOT NULL DEFAULT 'true',
	CONSTRAINT "app_tournament_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app_stage1" (
	"id" serial NOT NULL,
	"id_t" bigint NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "app_stage1_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "progress" (
	"id" serial NOT NULL,
	"name" bigint NOT NULL,
	"read_only" BOOLEAN NOT NULL,
	CONSTRAINT "progress_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app_stage1_row" (
	"id" serial NOT NULL,
	"row" bigint NOT NULL,
	"column" bigint NOT NULL,
	"score" bigint NOT NULL,
	CONSTRAINT "app_stage1_row_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app_player" (
	"id" serial NOT NULL,
	"name" varchar(255),
	"role" bigint NOT NULL,
	"match_played" bigint,
	"match_won" bigint,
	"score" DECIMAL,
	CONSTRAINT "app_player_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app_stage1_player" (
	"id" serial NOT NULL,
	"id_stage" bigint NOT NULL,
	"row" bigint NOT NULL UNIQUE,
	"id_pair" bigint NOT NULL,
	"score" bigint NOT NULL,
	"placement" bigint NOT NULL UNIQUE,
	CONSTRAINT "app_stage1_player_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app_stage2" (
	"id" serial NOT NULL,
	"id_t" bigint NOT NULL,
	"id_pair1" bigint NOT NULL,
	"id_pair2" bigint NOT NULL,
	"stage" bigint NOT NULL,
	"winner" bigint NOT NULL,
	CONSTRAINT "app_stage2_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app_tournament_pairs" (
	"id" serial NOT NULL,
	"id_t" bigint NOT NULL,
	"id_player1" bigint NOT NULL,
	"id_player2" bigint NOT NULL,
	CONSTRAINT "app_tournament_pairs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "auth_user" ADD CONSTRAINT "auth_user_fk0" FOREIGN KEY ("role") REFERENCES "auth_role"("id");


ALTER TABLE "app_tournament" ADD CONSTRAINT "app_tournament_fk0" FOREIGN KEY ("owner") REFERENCES "auth_user"("id");
ALTER TABLE "app_tournament" ADD CONSTRAINT "app_tournament_fk1" FOREIGN KEY ("progress") REFERENCES "progress"("id");

ALTER TABLE "app_stage1" ADD CONSTRAINT "app_stage1_fk0" FOREIGN KEY ("id_t") REFERENCES "app_tournament"("id");


ALTER TABLE "app_stage1_row" ADD CONSTRAINT "app_stage1_row_fk0" FOREIGN KEY ("row") REFERENCES "app_stage1_player"("row");
ALTER TABLE "app_stage1_row" ADD CONSTRAINT "app_stage1_row_fk1" FOREIGN KEY ("column") REFERENCES "app_stage1_player"("row");

ALTER TABLE "app_player" ADD CONSTRAINT "app_player_fk0" FOREIGN KEY ("role") REFERENCES "auth_role"("id");

ALTER TABLE "app_stage1_player" ADD CONSTRAINT "app_stage1_player_fk0" FOREIGN KEY ("id_stage") REFERENCES "app_stage1"("id");
ALTER TABLE "app_stage1_player" ADD CONSTRAINT "app_stage1_player_fk1" FOREIGN KEY ("id_pair") REFERENCES "app_tournament_pairs"("id");

ALTER TABLE "app_stage2" ADD CONSTRAINT "app_stage2_fk0" FOREIGN KEY ("id_t") REFERENCES "app_tournament"("id");
ALTER TABLE "app_stage2" ADD CONSTRAINT "app_stage2_fk1" FOREIGN KEY ("id_pair1") REFERENCES "app_tournament_pairs"("id");
ALTER TABLE "app_stage2" ADD CONSTRAINT "app_stage2_fk2" FOREIGN KEY ("id_pair2") REFERENCES "app_tournament_pairs"("id");
ALTER TABLE "app_stage2" ADD CONSTRAINT "app_stage2_fk3" FOREIGN KEY ("winner") REFERENCES "app_tournament_pairs"("id");

ALTER TABLE "app_tournament_pairs" ADD CONSTRAINT "app_tournament_pairs_fk0" FOREIGN KEY ("id_t") REFERENCES "app_tournament"("id");
ALTER TABLE "app_tournament_pairs" ADD CONSTRAINT "app_tournament_pairs_fk1" FOREIGN KEY ("id_player1") REFERENCES "app_player"("id");
ALTER TABLE "app_tournament_pairs" ADD CONSTRAINT "app_tournament_pairs_fk2" FOREIGN KEY ("id_player2") REFERENCES "app_player"("id");

