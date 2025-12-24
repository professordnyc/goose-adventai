/**
 * Winter Fairy Wishbox - Main Server
 * Express HTTP server with MCP endpoint
 */

import express from 'express';
import { handleMCPRequest } from './mcp/handler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Winter Fairy Wishbox',
    version: '1.0.0',
    description: 'A magical MCP-UI wishbox server for Day 17',
    endpoints: {
      mcp: '/mcp',
      health: '/',
    },
  });
});

// MCP endpoint
app.post('/mcp', (req, res) => {
  try {
    console.log('📬 MCP Request:', JSON.stringify(req.body, null, 2));
    
    const response = handleMCPRequest(req.body);
    
    // Only send response if not null (notifications return null)
    if (response === null) {
      console.log('📢 Notification acknowledged (no response sent)');
      res.status(204).end(); // No content
    } else {
      console.log('📤 MCP Response:', JSON.stringify(response, null, 2));
      res.json(response);
    }
  } catch (error: any) {
    console.error('❌ Error handling MCP request:', error);
    
    res.status(500).json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: {
        code: -32603,
        message: error.message || 'Internal server error',
      },
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('✨════════════════════════════════════════════════✨');
  console.log('   🎁  Winter Fairy Wishbox Server Started  🎁');
  console.log('✨════════════════════════════════════════════════✨');
  console.log('');
  console.log(`🌟 Server running on: http://localhost:${PORT}`);
  console.log(`🔮 MCP Endpoint: http://localhost:${PORT}/mcp`);
  console.log('');
  console.log('🎄 Available Tools:');
  console.log('   • addWish - Add a new wish to the wishbox');
  console.log('   • listWishes - View all wishes with filters');
  console.log('   • grantWish - Grant a wish with fairy magic');
  console.log('   • removeWish - Remove a wish from the wishbox');
  console.log('');
  console.log('✨ Ready to make wishes come true! ✨');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('');
  console.log('👋 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('');
  console.log('👋 Shutting down gracefully...');
  process.exit(0);
});
