export * from './design';

export const convertToFullUrl = (domain: string) => {
  if (!domain) {
    return '';
  }
  if (domain.startsWith('http')) {
    return domain;
  }
  return `https://${domain}`;
};

export const convertToDisplayUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url.split('://')[1];
  }
  return url;
};

interface FormatBytesArgs {
  bytes: number;
  decimals?: number;
}

export const formatBytes = (args: FormatBytesArgs) => {
  const { bytes, decimals = 2 } = args;

  if (!bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getInitials = (name: string) => {
  const initial = Array.from(name)[0];
  return initial || '';
};

export const getFullName = (args: {
  firstName?: string;
  lastName?: string;
  email?: string;
}) => {
  const { firstName, lastName, email } = args;

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  if (firstName) {
    return firstName;
  }

  return email || '';
};
