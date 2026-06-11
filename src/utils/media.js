const CLOUDFRONT_BASE_URL = 'https://d3k5js43cf9585.cloudfront.net';

const getPathFromAwsUrl = (url) => {
  const host = url.hostname;
  const path = url.pathname.replace(/^\/+/, '');

  if (!host.includes('amazonaws.com')) {
    return null;
  }

  if (host.startsWith('s3.') || host === 's3.amazonaws.com') {
    const [, ...rest] = path.split('/');
    return rest.join('/') || path;
  }

  return path;
};

export const assetUrl = (value) => {
  if (!value || typeof value !== 'string') return value;

  try {
    const url = new URL(value);
    const awsPath = getPathFromAwsUrl(url);

    if (!awsPath) return value;

    return `${CLOUDFRONT_BASE_URL}/${awsPath}${url.search || ''}`;
  } catch (error) {
    return value;
  }
};

export const withCdnMedia = (value) => {
  if (typeof value === 'string') return assetUrl(value);
  if (Array.isArray(value)) return value.map(withCdnMedia);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [key, withCdnMedia(entryValue)])
    );
  }

  return value;
};
