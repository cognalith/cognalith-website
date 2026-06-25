import {
  Users,
  Brain,
  Workflow,
  Shield,
  FileText,
  Zap,
  Mail,
  Globe,
  FolderOpen,
  Layers,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  Eye,
  Newspaper,
  Heart,
  Lock,
  Gamepad2,
  Trophy,
  type LucideIcon,
} from "lucide-react";

// Campus Entity Agents
export interface CampusAgent {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const campusAgents: CampusAgent[] = [
  {
    name: "Alice",
    role: "Chief Agent",
    description:
      "Designs new agents, interviews requesters, and produces Agent Creation Requests. The architect of the Campus.",
    icon: Brain,
    color: "#F6AD55",
  },
  {
    name: "LOIS",
    role: "AI Journalist",
    description:
      "Writes for Molty News. Covers what the Campus builds, investigates stories, and reports on Cognalith progress.",
    icon: Newspaper,
    color: "#DD6B20",
  },
  {
    name: "Mona",
    role: "Monolith Operator",
    description:
      "Monitors containers via Prometheus, manages the daily rhythm, handles incidents. Keeps the Forge running.",
    icon: Layers,
    color: "#F6AD55",
  },
  {
    name: "Aria",
    role: "Personal Life Assistant",
    description:
      "Tracks deadlines, nudges proactively, manages life across four pillars. Frank's day-to-day co-pilot.",
    icon: Heart,
    color: "#FEFCBF",
  },
  {
    name: "SyRA",
    role: "Security & Tool Broker",
    description:
      "Guards against prompt injection, brokers all agent-to-tool connections, enforces SATG authorization at runtime.",
    icon: Lock,
    color: "#DD6B20",
  },
  {
    name: "Iris",
    role: "Network Observer",
    description:
      "Monitors tool call patterns, detects behavioral drift, escalates risk. The silent watchdog of the Campus.",
    icon: Eye,
    color: "#F6AD55",
  },
];

// Neural Stack Layers
export interface NeuralLayer {
  level: string;
  name: string;
  description: string;
  color: string;
}

export const neuralStackLayers: NeuralLayer[] = [
  {
    level: "L4",
    name: "Chief of Staff Evaluator",
    description:
      "Validates decisions, tracks variance, routes escalations to human CEO",
    color: "accent-cyan",
  },
  {
    level: "L3",
    name: "Knowledge Layer",
    description:
      "RAG-enabled context retrieval, document memory, organizational knowledge",
    color: "accent-purple",
  },
  {
    level: "L2",
    name: "Skills Layer",
    description:
      "MCP tool integrations, API access, external service connections",
    color: "accent-green",
  },
  {
    level: "L1",
    name: "Persona Layer",
    description:
      "Immutable role identity, authority limits, domain expertise boundaries",
    color: "white",
  },
];

// Forge Technologies
export interface ForgeTech {
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const forgeTechnologies: ForgeTech[] = [
  {
    name: "Neural Stack",
    tagline: "4-Layer Agent Architecture",
    description:
      "Every agent operates through Persona, Skills, Knowledge, and Evaluator layers. Immutable identity at the base, human-in-the-loop validation at the top.",
    icon: Layers,
    color: "#F6AD55",
  },
  {
    name: "BAMS",
    tagline: "Bi-Temporal Agent Memory System",
    description:
      "Hot, warm, and cold memory tiers that let agents remember across sessions. Conversation context that persists, compresses, and evolves.",
    icon: Brain,
    color: "#DD6B20",
  },
  {
    name: "SATG",
    tagline: "Surface-Aware Tool Governance",
    description:
      "Runtime authorization for multi-agent systems. Every tool call is gated by Agent × Tool × Surface — no blanket permissions, no unaudited access.",
    icon: Shield,
    color: "#FEFCBF",
  },
];

// What We're Building - Products
export interface Product {
  name: string;
  description: string;
  tags: string[];
  color: string;
  status: string;
}

export const products: Product[] = [
  {
    name: "Teemates",
    description:
      "Social golf app for finding playing partners. Built with React Native, powered by the Monolith System.",
    tags: ["React Native", "Supabase", "MVP"],
    color: "from-green-600 to-emerald-500",
    status: "Coming Spring 2026",
  },
  {
    name: "Lyra",
    description:
      "A multi-agent protein reasoning system that analyzes AlphaFold structures to identify viable drug targets. Six specialized agents — query, structure, reasoning, critic, synthesis, comparison — work together to produce research briefs for scientists. Built for diseases the world forgot about.",
    tags: ["AlphaFold", "Multi-Agent", "Drug Discovery"],
    color: "from-blue-500 to-cyan-500",
    status: "Microsoft Foundry",
  },
  {
    name: "Agents League Coach",
    description:
      "Microsoft Foundry Agent that coaches teams on adopting AI agents into their workflows.",
    tags: ["Microsoft Foundry", "Agent", "Coaching"],
    color: "from-purple-500 to-indigo-500",
    status: "Microsoft Foundry",
  },
];

// The Gauntlet (Product Roadmap)
export interface GauntletItem {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const gauntletRoadmap: GauntletItem[] = [
  {
    name: "Teemates",
    description: "Social golf — find your next playing partner",
    icon: Users,
  },
  {
    name: "Indoor Tour",
    description: "Sim golf league management platform",
    icon: Trophy,
  },
  {
    name: "Tabletop Sherpa",
    description: "Board game companion and rules assistant",
    icon: Gamepad2,
  },
  {
    name: "Clawvatar.ai",
    description: "AI-powered avatar and identity system",
    icon: Sparkles,
  },
];

// Building in Public timeline
export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    date: "Jan 5, 2026",
    title: "Cognalith Founded",
    description:
      "Incorporated Cognalith Inc. Started building the Monolith System from scratch.",
  },
  {
    date: "Jan 17, 2026",
    title: "12 Days to Production",
    description:
      "Deployed AI dashboard, mobile app in App Store review, and documented architecture. All solo.",
  },
  {
    date: "Feb 2026",
    title: "The Campus Goes Live",
    description:
      "Alice, LOIS, Mona, Aria, SyRA, and Iris activated as persistent entity agents with BAMS memory.",
  },
  {
    date: "Feb 2026",
    title: "SATG Research Published",
    description:
      "Released the Surface-Aware Tool Governance preprint — runtime authorization for multi-agent systems.",
  },
];

// Navigation links
export const navLinks = [
  { href: "#story", label: "The Story" },
  { href: "#campus", label: "The Campus" },
  { href: "#forge", label: "The Forge" },
  { href: "#building", label: "What We're Building" },
  { href: "#timeline", label: "Timeline" },
  { href: "#contact", label: "Contact" },
];
