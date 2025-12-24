/**
 * Winter Fairy Wishbox - Type Definitions
 * Original implementation for Day 17
 */

export type WishCategory = 'toy' | 'experience' | 'kindness' | 'magic';
export type WishPriority = 'dream' | 'hopeful' | 'small';

/**
 * Represents a single wish in the magical wishbox
 */
export interface Wish {
  /** Unique identifier for the wish */
  id: string;
  
  /** The wish text itself */
  text: string;
  
  /** Category classification */
  category: WishCategory;
  
  /** Priority level */
  priority: WishPriority;
  
  /** Whether the wish has been granted */
  granted: boolean;
  
  /** Timestamp when wish was created */
  createdAt: Date;
  
  /** Timestamp when wish was granted (if applicable) */
  grantedAt?: Date;
}

/**
 * Statistics about the wishlist
 */
export interface WishlistStats {
  total: number;
  granted: number;
  pending: number;
  byCategory: Record<WishCategory, number>;
  byPriority: Record<WishPriority, number>;
  magicLevel: number; // 0-100 based on granted wishes
}

/**
 * Filter criteria for listing wishes
 */
export interface WishFilter {
  category?: WishCategory;
  priority?: WishPriority;
  grantedOnly?: boolean;
}
