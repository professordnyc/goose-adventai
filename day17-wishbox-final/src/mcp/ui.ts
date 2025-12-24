/**
 * Winter Fairy Wishbox - MCP-UI Generator
 * Creates beautiful, magical HTML for the Goose Desktop interface
 */

import { Wish, WishlistStats } from '../types/wish.js';

/**
 * Get emoji for wish category
 */
function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    toy: '🎁',
    experience: '🌟',
    kindness: '💝',
    magic: '✨',
  };
  return emojis[category] || '❓';
}

/**
 * Get emoji for wish priority
 */
function getPriorityEmoji(priority: string): string {
  const emojis: Record<string, string> = {
    dream: '🌠',
    hopeful: '💫',
    small: '⭐',
  };
  return emojis[priority] || '⚪';
}

/**
 * Get color theme for priority
 */
function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    dream: '#9c27b0',
    hopeful: '#5e35b1',
    small: '#3f51b5',
  };
  return colors[priority] || '#666';
}

/**
 * Format date to readable string
 */
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Generate CSS for the magical winter theme
 */
function getStyles(): string {
  return `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #1a237e 0%, #311b92 100%);
        color: #f0f4ff;
        padding: 20px;
        line-height: 1.6;
      }
      
      .container {
        max-width: 900px;
        margin: 0 auto;
      }
      
      .header {
        text-align: center;
        margin-bottom: 30px;
        padding: 25px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        border: 2px solid rgba(255, 215, 0, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }
      
      .header h1 {
        font-size: 2.5em;
        margin-bottom: 10px;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        animation: shimmer 3s infinite;
      }
      
      @keyframes shimmer {
        0%, 100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
        50% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(156, 39, 176, 0.5); }
      }
      
      .subtitle {
        font-size: 1.1em;
        opacity: 0.9;
        color: #c0c8e0;
      }
      
      .stats-bar {
        display: flex;
        justify-content: space-around;
        margin: 20px 0;
        padding: 15px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .stat-item {
        text-align: center;
        padding: 10px;
      }
      
      .stat-value {
        font-size: 1.8em;
        font-weight: bold;
        color: #ffd700;
      }
      
      .stat-label {
        font-size: 0.9em;
        color: #c0c8e0;
      }
      
      .magic-level {
        margin: 20px 0;
        text-align: center;
      }
      
      .magic-bar {
        width: 100%;
        height: 25px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 15px;
        overflow: hidden;
        border: 2px solid rgba(255, 215, 0, 0.3);
      }
      
      .magic-fill {
        height: 100%;
        background: linear-gradient(90deg, #9c27b0, #ffd700);
        border-radius: 15px;
        transition: width 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 0.9em;
      }
      
      .wishes-container {
        margin: 20px 0;
      }
      
      .wish-card {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 15px;
        border: 2px solid rgba(192, 200, 224, 0.2);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .wish-card:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 215, 0, 0.4);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      }
      
      .wish-of-day {
        border: 3px solid #ffd700;
        background: rgba(255, 215, 0, 0.1);
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
        animation: glow 2s infinite;
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.3); }
        50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.5), 0 0 60px rgba(156, 39, 176, 0.3); }
      }
      
      .wish-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .wish-badges {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
      
      .badge {
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.85em;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      
      .category-badge {
        background: rgba(94, 53, 177, 0.3);
        border: 1px solid rgba(94, 53, 177, 0.5);
      }
      
      .priority-badge {
        background: rgba(156, 39, 176, 0.3);
        border: 1px solid rgba(156, 39, 176, 0.5);
      }
      
      .status-badge {
        background: rgba(76, 175, 80, 0.3);
        border: 1px solid rgba(76, 175, 80, 0.5);
      }
      
      .wotd-badge {
        background: linear-gradient(135deg, #ffd700, #ff9800);
        color: #1a237e;
        font-weight: bold;
        padding: 6px 14px;
      }
      
      .wish-text {
        font-size: 1.1em;
        margin: 15px 0;
        color: #ffffff;
        line-height: 1.5;
      }
      
      .wish-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(192, 200, 224, 0.2);
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .wish-meta {
        font-size: 0.9em;
        color: #c0c8e0;
      }
      
      .wish-actions {
        display: flex;
        gap: 10px;
      }
      
      button {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9em;
      }
      
      .grant-btn {
        background: linear-gradient(135deg, #ffd700, #ff9800);
        color: #1a237e;
      }
      
      .grant-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
      }
      
      .remove-btn {
        background: rgba(244, 67, 54, 0.3);
        color: #ffffff;
        border: 1px solid rgba(244, 67, 54, 0.5);
      }
      
      .remove-btn:hover {
        background: rgba(244, 67, 54, 0.5);
      }
      
      .granted-indicator {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: #4caf50;
        font-weight: bold;
      }
      
      .footer {
        text-align: center;
        margin-top: 30px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        border-top: 2px solid rgba(255, 215, 0, 0.2);
      }
      
      .magic-quote {
        font-style: italic;
        color: #c0c8e0;
        margin-top: 10px;
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        border: 2px dashed rgba(192, 200, 224, 0.3);
      }
      
      .empty-state-icon {
        font-size: 4em;
        margin-bottom: 20px;
        opacity: 0.5;
      }
      
      .empty-state-text {
        font-size: 1.2em;
        color: #c0c8e0;
      }
      
      .snowflake {
        opacity: 0.6;
        font-size: 1.5em;
      }
    </style>
  `;
}

/**
 * Generate HTML for a single wish card
 */
function generateWishCard(wish: Wish, isWishOfDay: boolean = false): string {
  const categoryEmoji = getCategoryEmoji(wish.category);
  const priorityEmoji = getPriorityEmoji(wish.priority);
  const priorityColor = getPriorityColor(wish.priority);
  
  const wotdClass = isWishOfDay ? 'wish-of-day' : '';
  const wotdBadge = isWishOfDay ? '<span class="badge wotd-badge">👑 Wish of the Day</span>' : '';
  
  const grantedBadge = wish.granted 
    ? '<span class="badge status-badge"><span class="granted-indicator">✓ Granted</span></span>'
    : '';
  
  const grantedDate = wish.grantedAt 
    ? `<div class="wish-meta">✨ Granted on ${formatDate(wish.grantedAt)}</div>`
    : '';
  
  const actionButtons = !wish.granted
    ? `<button class="grant-btn" onclick="grantWish('${wish.id}')">✨ Grant Wish</button>`
    : '';
  
  return `
    <div class="wish-card ${wotdClass}">
      <div class="wish-header">
        <div class="wish-badges">
          ${wotdBadge}
          <span class="badge category-badge">${categoryEmoji} ${wish.category}</span>
          <span class="badge priority-badge" style="border-color: ${priorityColor}">${priorityEmoji} ${wish.priority}</span>
          ${grantedBadge}
        </div>
      </div>
      
      <div class="wish-text">"${wish.text}"</div>
      
      <div class="wish-footer">
        <div>
          <div class="wish-meta">🆔 ${wish.id}</div>
          <div class="wish-meta">📅 Created ${formatDate(wish.createdAt)}</div>
          ${grantedDate}
        </div>
        <div class="wish-actions">
          ${actionButtons}
          <button class="remove-btn" onclick="removeWish('${wish.id}')">🗑️ Remove</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate complete wishlist UI
 */
export function generateWishlistUI(wishes: Wish[], stats: WishlistStats, wishOfDay: Wish | null): string {
  const styles = getStyles();
  
  const wishCards = wishes.length > 0
    ? wishes.map(wish => generateWishCard(wish, wish.id === wishOfDay?.id)).join('')
    : `
      <div class="empty-state">
        <div class="empty-state-icon">✨🎁✨</div>
        <div class="empty-state-text">The wishbox is empty! Add your first magical wish.</div>
      </div>
    `;
  
  const magicLevelPercent = stats.magicLevel;
  const magicLevelText = magicLevelPercent === 100 ? 'Maximum Magic! 🌟' : `${magicLevelPercent}%`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Winter Fairy Wishbox</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1><span class="snowflake">❄️</span> ✨ Winter Fairy Wishbox ✨ <span class="snowflake">❄️</span></h1>
          <div class="subtitle">Where dreams take flight on wings of winter magic</div>
        </div>
        
        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-value">${stats.total}</div>
            <div class="stat-label">Total Wishes</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.granted}</div>
            <div class="stat-label">✓ Granted</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.pending}</div>
            <div class="stat-label">⏳ Pending</div>
          </div>
        </div>
        
        <div class="magic-level">
          <div class="stat-label">✨ Magic Level</div>
          <div class="magic-bar">
            <div class="magic-fill" style="width: ${magicLevelPercent}%">${magicLevelText}</div>
          </div>
        </div>
        
        <div class="wishes-container">
          ${wishCards}
        </div>
        
        <div class="footer">
          <div><strong>🎁 Category Distribution:</strong> 
            Toys: ${stats.byCategory.toy} | 
            Experiences: ${stats.byCategory.experience} | 
            Kindness: ${stats.byCategory.kindness} | 
            Magic: ${stats.byCategory.magic}
          </div>
          <div><strong>⭐ Priority Levels:</strong> 
            Dreams: ${stats.byPriority.dream} | 
            Hopeful: ${stats.byPriority.hopeful} | 
            Small: ${stats.byPriority.small}
          </div>
          <div class="magic-quote">
            "Every wish holds a spark of magic, waiting for the right moment to shine." ✨
          </div>
        </div>
      </div>
      
      <script>
        function grantWish(id) {
          alert('This button is for display only. Use the grantWish tool to grant wishes!');
        }
        
        function removeWish(id) {
          alert('This button is for display only. Use the removeWish tool to remove wishes!');
        }
      </script>
    </body>
    </html>
  `;
}

/**
 * Generate UI for a single wish result (after add/grant)
 */
export function generateWishResultUI(wish: Wish, action: 'added' | 'granted'): string {
  const styles = getStyles();
  const categoryEmoji = getCategoryEmoji(wish.category);
  const priorityEmoji = getPriorityEmoji(wish.priority);
  
  const title = action === 'added' 
    ? '✨ Wish Added to the Wishbox!'
    : '🌟 Wish Granted with Fairy Magic!';
  
  const message = action === 'added'
    ? 'Your wish has been added to the magical wishbox and is waiting for fairy magic!'
    : 'The wish has been granted! Magic sparkles fill the air! ✨';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
          <div class="subtitle">${message}</div>
        </div>
        
        ${generateWishCard(wish)}
        
        <div class="footer">
          <div class="magic-quote">Use listWishes to see all wishes in the magical wishbox!</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate UI for removal confirmation
 */
export function generateRemovalUI(wishId: string): string {
  const styles = getStyles();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wish Removed</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🗑️ Wish Removed</h1>
          <div class="subtitle">The wish has been removed from the wishbox</div>
        </div>
        
        <div style="text-align: center; padding: 40px; background: rgba(255,255,255,0.05); border-radius: 12px;">
          <div style="font-size: 3em; margin-bottom: 20px;">💨</div>
          <div style="font-size: 1.2em; color: #c0c8e0;">
            Wish <strong>${wishId}</strong> has been removed from the magical wishbox.
          </div>
        </div>
        
        <div class="footer">
          <div class="magic-quote">Use listWishes to see remaining wishes in the wishbox!</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate error UI
 */
export function generateErrorUI(error: string): string {
  const styles = getStyles();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ Oops!</h1>
          <div class="subtitle">Something went wrong with the magic</div>
        </div>
        
        <div style="text-align: center; padding: 40px; background: rgba(244,67,54,0.1); border-radius: 12px; border: 2px solid rgba(244,67,54,0.3);">
          <div style="font-size: 3em; margin-bottom: 20px;">🔮</div>
          <div style="font-size: 1.1em; color: #ffcdd2;">
            ${error}
          </div>
        </div>
        
        <div class="footer">
          <div class="magic-quote">Check your wish parameters and try again!</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
