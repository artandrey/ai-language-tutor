CREATE TABLE "calls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"transcript" text,
	"corrections" jsonb,
	"vocabulary" jsonb,
	"duration" text,
	"status" text DEFAULT 'pending',
	"agent_id" text,
	"ultravox_session_id" text,
	"is_active" boolean DEFAULT true,
	"call_started_at" timestamp,
	"call_ended_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "calls_ultravox_session_id_unique" UNIQUE("ultravox_session_id")
);
