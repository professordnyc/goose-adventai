/**
 * Winter Fairy Wishbox - MCP Tool Definitions
 * Defines the four magical tools with JSON schemas
 */

/**
 * Tool definitions for the MCP server
 */
export const tools = [
  {
    name: 'addWish',
    description: 'Add a new wish to the Winter Fairy Wishbox. Each wish has a category and priority level.',
    inputSchema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The wish text (1-500 characters)',
          minLength: 1,
          maxLength: 500,
        },
        category: {
          type: 'string',
          enum: ['toy', 'experience', 'kindness', 'magic'],
          description: 'Category: toy (physical items), experience (activities), kindness (helping others), magic (impossible dreams)',
        },
        priority: {
          type: 'string',
          enum: ['dream', 'hopeful', 'small'],
          description: 'Priority level: dream (biggest wishes), hopeful (medium wishes), small (little wishes)',
        },
      },
      required: ['text', 'category', 'priority'],
    },
  },
  {
    name: 'listWishes',
    description: 'List all wishes in the wishbox with optional filtering. Shows the current wish of the day.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['toy', 'experience', 'kindness', 'magic'],
          description: 'Filter by category (optional)',
        },
        priority: {
          type: 'string',
          enum: ['dream', 'hopeful', 'small'],
          description: 'Filter by priority level (optional)',
        },
        grantedOnly: {
          type: 'boolean',
          description: 'Show only granted wishes (optional)',
        },
      },
      required: [],
    },
  },
  {
    name: 'grantWish',
    description: 'Grant a wish by its ID, marking it as fulfilled with fairy magic.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique ID of the wish to grant',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'removeWish',
    description: 'Remove a wish from the wishbox by its ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique ID of the wish to remove',
        },
      },
      required: ['id'],
    },
  },
];
