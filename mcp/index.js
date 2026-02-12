import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

const API_KEY = process.env.PLANELO_API_KEY;
const BASE_URL = "https://planelo.app/v1";

if (!API_KEY) {
  console.error("Error: PLANELO_API_KEY environment variable is not set.");
  process.exit(1);
}

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
    "X-API-Key": API_KEY,
    "Content-Type": "application/json",
  },
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_projects",
        description: "List all projects in Planelo",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "list_ideas",
        description: "List ideas/tasks for a specific project",
        inputSchema: {
          type: "object",
          properties: {
            projectId: { type: "string", description: "The ID of the project" },
            status: { type: "string", enum: ["idea", "in_progress", "done"], description: "Filter by status" },
          },
          required: ["projectId"],
        },
      },
      {
        name: "create_idea",
        description: "Create a new idea/task in a project",
        inputSchema: {
          type: "object",
          properties: {
            projectId: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string", enum: ["idea", "in_progress", "done"], default: "idea" },
          },
          required: ["projectId", "title"],
        },
      },
      {
        name: "update_idea",
        description: "Update an existing idea/task",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string", description: "The ID of the idea" },
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string", enum: ["idea", "in_progress", "done"] },
          },
          required: ["id"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_projects": {
        const response = await httpClient.get("/projects");
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data.projects, null, 2),
            },
          ],
        };
      }
      case "list_ideas": {
        const response = await httpClient.get("/ideas", {
          params: { projectId: args.projectId, status: args.status },
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data.ideas, null, 2),
            },
          ],
        };
      }
      case "create_idea": {
        const response = await httpClient.post("/ideas", {
          ...args,
          source: "Gemini",
        });
        return {
          content: [
            {
              type: "text",
              text: `Created idea: ${response.data.idea.title} (ID: ${response.data.idea.id})`,
            },
          ],
        };
      }
      case "update_idea": {
        const response = await httpClient.patch(`/ideas/${args.id}`, args);
        return {
          content: [
            {
              type: "text",
              text: `Updated idea: ${args.id}`,
            },
          ],
        };
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.response?.data?.error || error.message}`,
        },
      ],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Planelo MCP server running on stdio");
