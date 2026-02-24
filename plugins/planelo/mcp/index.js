import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

const API_KEY = process.env.PLANELO_API_KEY;
const BASE_URL = "https://planelo.app/v1";

const server = new Server(
  {
    name: "planelo",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-API-Key": API_KEY || "MISSING",
    "Content-Type": "application/json",
  },
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_projects",
        description: "List all projects in Planelo",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "create_project",
        description: "Create a new project",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            color: { type: "string", description: "Hex color code" },
          },
          required: ["name"],
        },
      },
      {
        name: "update_project",
        description: "Update a project",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            color: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "delete_project",
        description: "Archive/Delete a project",
        inputSchema: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
        },
      },
      {
        name: "get_brain",
        description: "Get the AI context (brain) for a project",
        inputSchema: {
          type: "object",
          properties: { projectId: { type: "string" } },
          required: ["projectId"],
        },
      },
      {
        name: "update_brain",
        description: "Update the AI context (brain) for a project",
        inputSchema: {
          type: "object",
          properties: {
            projectId: { type: "string" },
            content: { type: "string" },
          },
          required: ["projectId", "content"],
        },
      },
      {
        name: "list_ideas",
        description: "List ideas/tasks for a project",
        inputSchema: {
          type: "object",
          properties: {
            projectId: { type: "string" },
            status: { type: "string", enum: ["idea", "in_progress", "done"] },
          },
          required: ["projectId"],
        },
      },
      {
        name: "create_idea",
        description: "Create a new idea/task",
        inputSchema: {
          type: "object",
          properties: {
            projectId: { type: "string" },
            title: { type: "string" },
            body: { type: "string", description: "Detailed description of the task" },
            status: { type: "string", enum: ["idea", "in_progress", "done"], default: "idea" },
            priority: { type: "string", enum: ["low", "medium", "high"], default: "medium" },
            tags: { type: "array", items: { type: "string" } },
          },
          required: ["projectId", "title"],
        },
      },
      {
        name: "update_idea",
        description: "Update an idea/task",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            body: { type: "string" },
            status: { type: "string", enum: ["idea", "in_progress", "done"] },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            tags: { type: "array", items: { type: "string" } },
          },
          required: ["id"],
        },
      },
      {
        name: "delete_idea",
        description: "Delete an idea/task",
        inputSchema: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (!API_KEY) {
    return {
      content: [{ type: "text", text: "Error: PLANELO_API_KEY is not set. Please set it using 'export PLANELO_API_KEY=your_key' and restart." }],
      isError: true,
    };
  }

  const { name, arguments: args } = request.params;
  try {
    switch (name) {
      case "list_projects": {
        const res = await httpClient.get("/projects");
        return { content: [{ type: "text", text: JSON.stringify(res.data.projects, null, 2) }] };
      }
      case "create_project": {
        const res = await httpClient.post("/projects", args);
        return { content: [{ type: "text", text: `Created project: ${res.data.project.name}` }] };
      }
      case "update_project": {
        await httpClient.patch(`/projects/${args.id}`, args);
        return { content: [{ type: "text", text: "Project updated." }] };
      }
      case "get_brain": {
        const res = await httpClient.get(`/projects/${args.projectId}/brain`);
        return { content: [{ type: "text", text: res.data.brain?.content || "No brain content found." }] };
      }
      case "update_brain": {
        await httpClient.put(`/projects/${args.projectId}/brain`, { content: args.content });
        return { content: [{ type: "text", text: "Project brain updated." }] };
      }
      case "list_ideas": {
        const res = await httpClient.get("/ideas", { params: { projectId: args.projectId, status: args.status } });
        return { content: [{ type: "text", text: JSON.stringify(res.data.ideas, null, 2) }] };
      }
      case "create_idea": {
        const payload = { ...args, source: "Claude Plugin" };
        const res = await httpClient.post("/ideas", payload);
        return { content: [{ type: "text", text: `Created idea: ${res.data.idea.title} (ID: ${res.data.idea.id})` }] };
      }
      case "update_idea": {
        await httpClient.patch(`/ideas/${args.id}`, args);
        return { content: [{ type: "text", text: "Idea updated." }] };
      }
      case "delete_idea": {
        await httpClient.delete(`/ideas/${args.id}`);
        return { content: [{ type: "text", text: "Idea deleted." }] };
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `API Error: ${error.response?.data?.error || error.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Planelo MCP server running on stdio");
