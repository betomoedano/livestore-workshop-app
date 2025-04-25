import { Reaction } from "../schema";

/**
 * Groups reactions by emoji and counts them
 * @param reactions Array of reactions to group
 * @returns Record mapping emoji to count
 */
export function groupReactionsByEmoji(
  reactions: readonly Reaction[]
): Record<string, number> {
  return reactions.reduce((acc: Record<string, number>, reaction: Reaction) => {
    const { emoji } = reaction;
    if (!acc[emoji]) {
      acc[emoji] = 0;
    }
    acc[emoji]++;
    return acc;
  }, {});
}
