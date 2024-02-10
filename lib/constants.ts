export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME ?? 'Voi';
export const PROJECT_DESC = 'Minimalist feedback management';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? `${PROJECT_NAME} Team <noreply@sieutoc.website>`;
