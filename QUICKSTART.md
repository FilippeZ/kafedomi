# oh-my-ag Quick Start Guide

## ✅ Installation Complete!

Your kafedomi project now has **9 specialized AI agents** and **7 workflow commands**.

---

## 🚀 Get Started in 3 Steps

### 1. Run Initial Setup

```
/setup
```

This will configure:
- Response language (English, Korean, Japanese, etc.)
- CLI installations and versions
- MCP connections
- Agent-CLI mapping

### 2. Test with a Simple Task

Try one of these:

```
"Create a login form with Tailwind CSS and form validation"
```
→ frontend-agent activates

```
"Implement JWT authentication API with FastAPI"
```
→ backend-agent activates

```
"Fix the TypeError in the payment processing function"
```
→ debug-agent activates

### 3. Try a Complex Project

```
"Build a TODO app with user authentication"
```
→ workflow-guide coordinates multiple agents

---

## 📋 Available Workflows

| Command | What It Does |
|---------|--------------|
| `/setup` | Configure language, CLI, and MCP settings |
| `/plan` | Break down requirements into actionable tasks |
| `/coordinate` | Interactive multi-agent orchestration (step-by-step) |
| `/orchestrate` | Automated parallel agent execution (fully automated) |
| `/debug` | Structured bug diagnosis and fixing |
| `/review` | Full QA pipeline (security, performance, accessibility) |
| `/tools` | Manage MCP tools (list, enable, disable) |
| `/commit` | Create conventional commits |

---

## 🤖 Available Agents

| Agent | Specialization | Example Trigger |
|-------|----------------|-----------------|
| **workflow-guide** | Multi-agent coordination | "Build a full-stack app" |
| **pm-agent** | Project planning | "Plan this feature" |
| **frontend-agent** | React/Next.js UI | "Create a dashboard" |
| **backend-agent** | FastAPI APIs | "Build REST API" |
| **mobile-agent** | Flutter apps | "Create mobile app" |
| **qa-agent** | Security & testing | "Review security" |
| **debug-agent** | Bug fixing | "Fix this error" |
| **orchestrator** | CLI automation | (Used by workflows) |
| **commit** | Git commits | "Commit changes" |

---

## 💡 Usage Patterns

### Simple Task (Single Agent)
Just chat naturally - the right agent activates automatically:
```
"Add dark mode toggle to the navbar"
```

### Complex Project (Multiple Agents)
Use workflows for coordination:
```
/coordinate
```
Then follow the step-by-step guidance.

### Planning First
Get a structured plan before coding:
```
/plan
```

### Quality Assurance
Review your code for issues:
```
/review
```

---

## 📊 Real-time Monitoring (Optional)

Install Bun and oh-my-ag globally to use dashboards:

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install oh-my-ag
bun install --global oh-my-ag

# Run terminal dashboard
bunx oh-my-ag dashboard

# Or web dashboard
bunx oh-my-ag dashboard:web
# → http://localhost:9847
```

---

## 🎯 Next Steps

1. **Run `/setup`** to configure your preferences
2. **Test with a simple task** to see agents in action
3. **Try `/plan`** to see PM Agent break down a feature
4. **Explore `/coordinate`** for multi-agent projects
5. **Read the full walkthrough** for advanced features

---

## 📚 Documentation

- **Full Walkthrough**: See `walkthrough.md` in artifacts
- **Implementation Plan**: See `implementation_plan.md` in artifacts
- **Original README**: `oh-my-ag/README.md`
- **Usage Guide**: `oh-my-ag/USAGE.md`
- **Agent Guide**: `oh-my-ag/AGENT_GUIDE.md`

---

## 🔧 Troubleshooting

**Skills not loading?**
- Restart Antigravity IDE
- Open project with `antigravity open .`

**Workflows not working?**
- Verify `.agent/workflows/` exists
- Check workflow files have `.md` extension

**Need help?**
- Check the full walkthrough in artifacts
- Review examples in `.agent/skills/*/resources/examples.md`

---

**Your project is ready! Start by running `/setup` to configure your preferences.** 🎉
