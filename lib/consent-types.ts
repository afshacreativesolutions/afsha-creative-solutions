export type ConsentCategories = {
  essential: true; // Always true
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
};

export type ConsentState = {
  consentId: string;
  visitorId: string;
  categories: ConsentCategories;
  action: 'accept_all' | 'reject_optional' | 'custom_save' | 'revoke';
  timestamp: string; // ISO 8601
  version: number;
};

export const CONSENT_COOKIE_NAME = "afsha_consent_v1";
export const VISITOR_COOKIE_NAME = "afsha_vid";
export const SESSION_COOKIE_NAME = "afsha_sid";
export const CURRENT_CONSENT_VERSION = 1;

export const DEFAULT_DENIED_CATEGORIES: ConsentCategories = {
  essential: true,
  analytics: false,
  advertising: false,
  personalization: false,
};

export const ALL_GRANTED_CATEGORIES: ConsentCategories = {
  essential: true,
  analytics: true,
  advertising: true,
  personalization: true,
};
