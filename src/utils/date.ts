import { formatDistance, formatRFC7231 } from 'date-fns';

import type { TDateISO } from '@/types/datetime';

export const formatDistanceFromNow = (date: TDateISO | null) => {
  if (!date) return null;
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
};

export const formatHumanReadableTime = (date: TDateISO | null) => {
  if (!date) return undefined;
  return formatRFC7231(new Date(date));
};
