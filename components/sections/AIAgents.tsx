"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import {
  Brain,
  Code,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Database,
  LineChart,
  Settings,
  FileText,
  Lock,
  DollarSign,
} from "lucide-react";

const agents = [
  {
    id: "ceo",
    name: "CEO Agent",
    role: "Chief Executive",
    tier: "Executive",
    color: "#00d4ff",
    icon: Brain,
    description: "Strategic decisions and human-in-the-loop oversight for critical operations.",
    capabilities: ["Strategic Planning", "Decision Approval", "Resource Allocation"],
  },
  {
    id: "cto",
    name: "CTO Agent",
    role: "Chief Technology",
    tier: "C-Suite",
    color: "#a855f7",
    icon: Code,
    description: "Technology strategy, architecture decisions, and development oversight.",
    capabilities: ["Tech Architecture", "System Design", "Team Coordination"],
  },
  {
    id: "cfo",
    name: "CFO Agent",
    role: "Chief Financial",
    tier: "C-Suite",
    color: "#00ff88",
    icon: DollarSign,
    description: "Financial planning, budgeting, and economic analysis.",
    capabilities: ["Budget Planning", "Financial Analysis", "Cost Optimization"],
  },
  {
    id: "coo",
    name: "COO Agent",
    role: "Chief Operations",
    tier: "C-Suite",
    color: "#ff6b6b",
    icon: Settings,
    description: "Operations management and process efficiency optimization.",
    capabilities: ["Process Automation", "Workflow Design", "Efficiency Metrics"],
  },
  {
    id: "ciso",
    name: "CISO Agent",
    role: "Chief Security",
    tier: "C-Suite",
    color: "#ffd93d",
    icon: Shield,
    description: "Security posture, risk assessment, and compliance oversight.",
    capabilities: ["Security Audits", "Risk Management", "Compliance"],
  },
  {
    id: "devops",
    name: "DevOps Agent",
    role: "Infrastructure",
    tier: "Team Lead",
    color: "#4ecdc4",
    icon: Zap,
    description: "CI/CD pipelines, deployments, and infrastructure management.",
    capabilities: ["Auto Deployment", "Monitoring", "Infrastructure as Code"],
  },
  {
    id: "swe",
    name: "SWE Agent",
    role: "Development",
    tier: "Team Lead",
    color: "#00d4ff",
    icon: Code,
    description: "Full-stack development, code review, and implementation.",
    capabilities: ["Code Generation", "Code Review", "Testing"],
  },
  {
    id: "data",
    name: "Data Agent",
    role: "Analytics",
    tier: "Team Lead",
    color: "#a855f7",
    icon: Database,
    description: "Data engineering, analytics pipelines, and insights generation.",
    capabilities: ["Data Pipelines", "Analytics", "ML Models"],
  },
  {
    id: "qa",
    name: "QA Agent",
    role: "Quality",
    tier: "Team Lead",
    color: "#00ff88",
    icon: FileText,
    description: "Testing, quality assurance, and bug tracking.",
    capabilities: ["Automated Testing", "Bug Detection", "Quality Reports"],
  },
];

const tierColors = {
  Executive: "#00d4ff",
  "C-Suite": "#a855f7",
  "Team Lead": "#00ff88",
};

export default function AIAgents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentParam = searchParams.get("agent");
  
  const initialAgent = agentParam 
    ? agents.find(a => a.id === agentParam) || agents[0]
    : agents[0];
  
  const [selectedAgent, setSelectedAgent] = useState(initialAgent);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  // Sync URL with selected agent
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedAgent.id !== agentParam) {
      params.set("agent", selectedAgent.id);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [selectedAgent.id, agentParam, router, searchParams]);

  return (
    <section id="agents" className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-secondary to-dark" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-cyan text-sm font-medium tracking-wider uppercase">
            Meet Your Team
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6 text-balance">
            15 AI Agents.{" "}
            <span className="gradient-text">One Vision.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Each agent specializes in a specific domain, working together like a
            well-coordinated executive team—available 24/7.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Agent Grid */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-4">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              const isSelected = selectedAgent.id === agent.id;
              const isHovered = hoveredAgent === agent.id;

              return (
                <motion.button
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedAgent(agent)}
                  onMouseEnter={() => setHoveredAgent(agent.id)}
                  onMouseLeave={() => setHoveredAgent(null)}
                  aria-label={`Select ${agent.name} agent`}
                  className={`
                    relative p-4 rounded-xl border transition-all duration-300
                    ${isSelected
                      ? "bg-dark-card border-accent-cyan shadow-lg shadow-accent-cyan/20"
                      : "bg-dark-tertiary border-white/5 hover:border-white/20"
                    }
                  `}
                  style={{
                    boxShadow: isSelected ? `0 0 30px ${agent.color}30` : undefined,
                  }}
                >
                  {/* Glow effect on hover */}
                  {(isHovered || isSelected) && (
                    <motion.div
                      layoutId="agent-glow"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `radial-gradient(circle at center, ${agent.color}10, transparent 70%)`,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto"
                      style={{ backgroundColor: `${agent.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: agent.color }} aria-hidden="true" />
                    </div>
                    <h3 className="font-medium text-sm text-white">{agent.name}</h3>
                    <p className="text-xs text-text-muted mt-1">{agent.role}</p>
                    <span
                      className="inline-block mt-2 px-2 py-0.5 text-[10px] rounded-full"
                      style={{
                        backgroundColor: `${tierColors[agent.tier as keyof typeof tierColors]}15`,
                        color: tierColors[agent.tier as keyof typeof tierColors],
                      }}
                    >
                      {agent.tier}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Agent Details Panel */}
          <motion.div
            key={selectedAgent.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-card border border-white/10 rounded-2xl p-6 h-fit sticky top-24"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: `${selectedAgent.color}20`,
                boxShadow: `0 0 40px ${selectedAgent.color}30`,
              }}
            >
              <selectedAgent.icon
                className="w-8 h-8"
                style={{ color: selectedAgent.color }}
              />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedAgent.name}
            </h3>
            <p className="text-text-secondary mb-6 line-clamp-3">{selectedAgent.description}</p>

            <h4 className="text-sm font-medium text-accent-cyan mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2">
              {selectedAgent.capabilities.map((cap, i) => (
                <motion.li
                  key={cap}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: selectedAgent.color }}
                  />
                  {cap}
                </motion.li>
              ))}
            </ul>

            {/* Status indicator */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: selectedAgent.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: selectedAgent.color }}
                  />
                </span>
                <span className="text-xs text-text-muted">Active & Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
