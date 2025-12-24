/**
 * Winter Fairy Wishbox - MCP Protocol Handler
 * Handles MCP requests and executes tools
 */

import { wishlistStore } from '../store/wishlist.js';
import { WishCategory, WishPriority } from '../types/wish.js';
import { tools } from './tools.js';
import {
  generateWishlistUI,
  generateWishResultUI,
  generateRemovalUI,
  generateErrorUI,
} from './ui.js';

/**
 * MCP Request interface
 */
interface MCPRequest {
  jsonrpc: string;
  id?: string | number;
  method: string;
  params?: any;
}

/**
 * MCP Response interface
 */
interface MCPResponse {
  jsonrpc: string;
  id?: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

/**
 * Handle tools/list request
 */
function handleToolsList(): any {
  return {
    tools: tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  };
}

/**
 * Handle addWish tool
 */
function handleAddWish(args: any): any {
  try {
    const { text, category, priority } = args;

    // Validation
    if (!text || typeof text !== 'string') {
      throw new Error('text is required and must be a string');
    }
    if (text.length < 1 || text.length > 500) {
      throw new Error('text must be between 1 and 500 characters');
    }
    if (!['toy', 'experience', 'kindness', 'magic'].includes(category)) {
      throw new Error('category must be one of: toy, experience, kindness, magic');
    }
    if (!['dream', 'hopeful', 'small'].includes(priority)) {
      throw new Error('priority must be one of: dream, hopeful, small');
    }

    const wish = wishlistStore.addWish(
      text,
      category as WishCategory,
      priority as WishPriority
    );

    const html = generateWishResultUI(wish, 'added');

    return {
      content: [
        {
          type: 'text',
          text: `Wish added successfully! ID: ${wish.id}`,
        },
        {
          type: 'html',
          html: html,
        },
      ],
    };
  } catch (error: any) {
    const html = generateErrorUI(error.message);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
        {
          type: 'html',
          html: html,
        },
      ],
      isError: true,
    };
  }
}

/**
 * Handle listWishes tool
 */
function handleListWishes(args: any): any {
  try {
    const { category, priority, grantedOnly } = args || {};

    const filter: any = {};
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (grantedOnly !== undefined) filter.grantedOnly = grantedOnly;

    const wishes = wishlistStore.listWishes(filter);
    const stats = wishlistStore.getStats();
    const wishOfDay = wishlistStore.getWishOfTheDay();

    const html = generateWishlistUI(wishes, stats, wishOfDay);

    const summary = `Found ${wishes.length} wish(es). Magic Level: ${stats.magicLevel}%. ${
      wishOfDay ? `Wish of the Day: "${wishOfDay.text}"` : 'No ungranted wishes.'
    }`;

    return {
      content: [
        {
          type: 'text',
          text: summary,
        },
        {
          type: 'html',
          html: html,
        },
      ],
    };
  } catch (error: any) {
    const html = generateErrorUI(error.message);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
        {
          type: 'html',
          html: html,
        },
      ],
      isError: true,
    };
  }
}

/**
 * Handle grantWish tool
 */
function handleGrantWish(args: any): any {
  try {
    const { id } = args;

    if (!id || typeof id !== 'string') {
      throw new Error('id is required and must be a string');
    }

    const wish = wishlistStore.grantWish(id);

    if (!wish) {
      throw new Error(`Wish with ID "${id}" not found`);
    }

    const html = generateWishResultUI(wish, 'granted');

    return {
      content: [
        {
          type: 'text',
          text: `Wish granted successfully! ✨ "${wish.text}"`,
        },
        {
          type: 'html',
          html: html,
        },
      ],
    };
  } catch (error: any) {
    const html = generateErrorUI(error.message);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
        {
          type: 'html',
          html: html,
        },
      ],
      isError: true,
    };
  }
}

/**
 * Handle removeWish tool
 */
function handleRemoveWish(args: any): any {
  try {
    const { id } = args;

    if (!id || typeof id !== 'string') {
      throw new Error('id is required and must be a string');
    }

    const removed = wishlistStore.removeWish(id);

    if (!removed) {
      throw new Error(`Wish with ID "${id}" not found`);
    }

    const html = generateRemovalUI(id);

    return {
      content: [
        {
          type: 'text',
          text: `Wish removed successfully: ${id}`,
        },
        {
          type: 'html',
          html: html,
        },
      ],
    };
  } catch (error: any) {
    const html = generateErrorUI(error.message);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
        {
          type: 'html',
          html: html,
        },
      ],
      isError: true,
    };
  }
}

/**
 * Handle tools/call request
 */
function handleToolsCall(params: any): any {
  const { name, arguments: args } = params;

  switch (name) {
    case 'addWish':
      return handleAddWish(args);
    case 'listWishes':
      return handleListWishes(args);
    case 'grantWish':
      return handleGrantWish(args);
    case 'removeWish':
      return handleRemoveWish(args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

/**
 * Handle initialize request
 */
function handleInitialize(): any {
  return {
    protocolVersion: '2024-11-05',
    serverInfo: {
      name: 'Winter Fairy Wishbox',
      version: '1.0.0',
    },
    capabilities: {
      tools: {},
    },
  };
}

/**
 * Main MCP request handler
 */
export function handleMCPRequest(request: MCPRequest): MCPResponse | null {
  const { jsonrpc, id, method, params } = request;

  // Handle notifications (no response needed)
  if (method.startsWith('notifications/')) {
    console.log(`📢 Notification received: ${method}`);
    return null; // Notifications don't get responses
  }

  try {
    let result: any;

    switch (method) {
      case 'initialize':
        result = handleInitialize();
        break;
      case 'tools/list':
        result = handleToolsList();
        break;
      case 'tools/call':
        result = handleToolsCall(params);
        break;
      case 'prompts/list':
        result = { prompts: [] };
        break;
      case 'resources/list':
        result = { resources: [] };
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return {
      jsonrpc,
      id,
      result,
    };
  } catch (error: any) {
    return {
      jsonrpc,
      id,
      error: {
        code: -32603,
        message: error.message || 'Internal error',
      },
    };
  }
}
