export function formatCallDuration(startDateStr: string, endDateStr: string): string {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  
  const durationMs = endDate.getTime() - startDate.getTime();
  
  if (isNaN(durationMs) || durationMs < 0) {
    return '0 сек';
  }
  
  const totalSeconds = Math.floor(durationMs / 1000);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}`);
  if (minutes > 0) parts.push(`${minutes}`);
  parts.push(`${seconds}`);
  
  return parts.join(':');
}
