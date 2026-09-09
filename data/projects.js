export const portfolioUpdated = "September 2026";

export const projects = [
  {
    id: "01",
    title: "AI Cost Guard",
    sourceProject: "AI-Cost-MGM",
    category: "AI FINOPS",
    summary: "Budget-aware controls for AI operations.",
    challenge: "AI spend is easy to start and hard to observe. This control layer makes daily cost limits visible and turns them into a deliberate operating decision.",
    approach: "A policy-driven monitor checks current usage on a regular cadence, supports a review-first dry run, and can take a defined protective action when a daily boundary is crossed.",
    technology: ["Python", "OpenAI Admin API", "Launchd", "JSON policy"],
    operation: "Hourly monitoring, explicit dry-run mode and a clear escalation boundary."
  },
  {
    id: "02",
    title: "Personal Memory Engine",
    sourceProject: "AIPersonalAssistant",
    category: "PRIVATE AI",
    summary: "Searchable context without giving away the source.",
    challenge: "Personal information becomes useful only when it can be found, connected and trusted—without making a cloud copy the default.",
    approach: "A local-first memory system keeps raw exports intact while building a structured, searchable layer for retrieval, topics and working context.",
    technology: ["Python", "SQLite", "FTS5", "Embeddings", "Codex"],
    operation: "Local data boundary, deduplicated imports and a rebuildable personal taxonomy."
  },
  {
    id: "03",
    title: "Lead Intelligence",
    sourceProject: "OpenOutreach",
    category: "GROWTH OPERATIONS",
    summary: "From an ideal customer profile to an explainable outreach queue.",
    challenge: "Outbound work loses quality when discovery, qualification and follow-up live in separate tools and opaque handoffs.",
    approach: "A self-hosted workflow turns a product brief into target discovery, AI-assisted qualification and channel-aware outreach—while retaining a clear operating model.",
    technology: ["Django", "SQLite", "Playwright", "FastEmbed", "Docker"],
    operation: "Qualification learns from decisions; the workflow keeps explicit pacing and channel rules."
  },
  {
    id: "04",
    title: "Professional Presence Operations",
    sourceProject: "JobFinder",
    category: "WORKFLOW DESIGN",
    summary: "A controlled system for professional relationships and content.",
    challenge: "Maintaining a professional presence involves recurring research, judgment and follow-through—not a single automation button.",
    approach: "A local operations backend turns the work into small, auditable routines: source discovery, quality gates, a visible execution step and a record of what happened.",
    technology: ["FastAPI", "Python", "Playwright", "Cloudflare Workers", "SQLite"],
    operation: "Daily caps, emergency stops and manual-clearance boundaries are built into the flow."
  },
  {
    id: "05",
    title: "Anna — Legal Intelligence",
    sourceProject: "LexRoom Analisys",
    category: "VERTICAL AI",
    summary: "A legal-assistant product shaped around evidence and trust.",
    challenge: "Legal AI is only useful when sources, permissions and uncertainty are handled as product features rather than footnotes.",
    approach: "The product combines a focused legal workspace, source-aware retrieval and a separate integration layer for approved providers—designed to distinguish verified material from what still needs validation.",
    technology: ["Cloudflare Workers", "Session auth", "Legal-source connectors", "OneLegale integration", "Responsive web UI"],
    operation: "Separate workspaces, metadata-first sources and explicit evidence states support careful use."
  },
  {
    id: "06",
    title: "Messaging Operations",
    sourceProject: "WhatsApp-Manager",
    category: "COMMUNICATION SYSTEMS",
    summary: "Structured conversations, backups and actionable signals.",
    challenge: "High-volume messaging becomes operationally expensive when context, media and follow-up live in a stream with no reliable structure.",
    approach: "A local manager treats conversations as an operational system: maintain the session, preserve readable history, verify evidence and surface the work that needs attention.",
    technology: ["TypeScript", "Fastify", "OpenWA", "OpenAI", "Docker", "Cron"],
    operation: "Local-first storage, session health checks and recoverable backup routines."
  }
];
