/**
 * Winter Fairy Wishbox - Wishlist Storage
 * In-memory storage with wish management logic
 */

import { Wish, WishCategory, WishPriority, WishFilter, WishlistStats } from '../types/wish.js';

/**
 * In-memory wishlist store with CRUD operations
 */
class WishlistStore {
  private wishes: Wish[] = [];
  private nextId: number = 1;

  /**
   * Add a new wish to the wishbox
   */
  addWish(text: string, category: WishCategory, priority: WishPriority): Wish {
    const wish: Wish = {
      id: `wish_${this.nextId++}`,
      text,
      category,
      priority,
      granted: false,
      createdAt: new Date(),
    };

    this.wishes.push(wish);
    return wish;
  }

  /**
   * List wishes with optional filtering
   */
  listWishes(filter?: WishFilter): Wish[] {
    let filtered = [...this.wishes];

    if (filter?.category) {
      filtered = filtered.filter(w => w.category === filter.category);
    }

    if (filter?.priority) {
      filtered = filtered.filter(w => w.priority === filter.priority);
    }

    if (filter?.grantedOnly !== undefined) {
      filtered = filtered.filter(w => w.granted === filter.grantedOnly);
    }

    // Sort: ungranted first, then by priority (dream > hopeful > small), then by date
    return filtered.sort((a, b) => {
      if (a.granted !== b.granted) {
        return a.granted ? 1 : -1;
      }
      
      const priorityOrder = { dream: 0, hopeful: 1, small: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  /**
   * Grant a wish by ID
   */
  grantWish(id: string): Wish | null {
    const wish = this.wishes.find(w => w.id === id);
    
    if (!wish) {
      return null;
    }

    wish.granted = true;
    wish.grantedAt = new Date();
    
    return wish;
  }

  /**
   * Remove a wish by ID
   */
  removeWish(id: string): boolean {
    const index = this.wishes.findIndex(w => w.id === id);
    
    if (index === -1) {
      return false;
    }

    this.wishes.splice(index, 1);
    return true;
  }

  /**
   * Get the "Wish of the Day" - highest priority ungranted wish
   * Uses a scoring algorithm based on priority and age
   */
  getWishOfTheDay(): Wish | null {
    const ungranted = this.wishes.filter(w => !w.granted);
    
    if (ungranted.length === 0) {
      return null;
    }

    // Score based on priority weight × days since creation
    const priorityWeights = { dream: 3, hopeful: 2, small: 1 };
    const now = new Date();
    
    const scored = ungranted.map(wish => {
      const daysOld = (now.getTime() - wish.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const score = priorityWeights[wish.priority] * (1 + daysOld);
      return { wish, score };
    });

    scored.sort((a, b) => b.score - a.score);
    
    return scored[0].wish;
  }

  /**
   * Get wishlist statistics
   */
  getStats(): WishlistStats {
    const total = this.wishes.length;
    const granted = this.wishes.filter(w => w.granted).length;
    const pending = total - granted;

    const byCategory: Record<WishCategory, number> = {
      toy: 0,
      experience: 0,
      kindness: 0,
      magic: 0,
    };

    const byPriority: Record<WishPriority, number> = {
      dream: 0,
      hopeful: 0,
      small: 0,
    };

    this.wishes.forEach(wish => {
      byCategory[wish.category]++;
      byPriority[wish.priority]++;
    });

    // Magic level: percentage of wishes granted, 0-100
    const magicLevel = total === 0 ? 0 : Math.round((granted / total) * 100);

    return {
      total,
      granted,
      pending,
      byCategory,
      byPriority,
      magicLevel,
    };
  }

  /**
   * Get a wish by ID
   */
  getWish(id: string): Wish | null {
    return this.wishes.find(w => w.id === id) || null;
  }

  /**
   * Get all wishes (for debugging)
   */
  getAllWishes(): Wish[] {
    return [...this.wishes];
  }
}

// Singleton instance
export const wishlistStore = new WishlistStore();
