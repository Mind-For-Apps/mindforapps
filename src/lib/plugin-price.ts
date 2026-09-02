export function formatPluginPrice(monthly: number | null, oneTime: number | null) {
  if (oneTime !== null && monthly !== null)
    return `$${oneTime} once or $${monthly}/mo`;
  if (oneTime !== null) return `$${oneTime} once`;
  if (monthly !== null) return `$${monthly}/mo`;
  return null;
}
