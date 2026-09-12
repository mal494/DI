/**
 * analytics.ts — cookie-free visitor measurement for Divine Insight.
 *
 * Disabled by default: the site ships with zero tracking until the owner's
 * analytics provider site code arrives. To activate, set `enabled: true` and
 * fill `scriptUrl` + `dataAttribute` with the provider snippet's values
 * (e.g. GoatCounter: scriptUrl = "https://gc.zgo.at/count.js",
 * dataAttribute = the site slug shown on your GoatCounter dashboard).
 * That is a one-line change here — no component code edits.
 */
export const ANALYTICS = {
  /** Master switch — set to `true` to load the analytics script. */
  enabled: false,
  /** Provider script URL, e.g. "https://gc.zgo.at/count.js". */
  scriptUrl: "",
  /** Value for the `data-goatcounter` attribute (the provider site code). */
  dataAttribute: "",
};

/** True only when the switch is on AND both fields are filled in. */
export function analyticsConfigured(): boolean {
  return ANALYTICS.enabled && ANALYTICS.scriptUrl.length > 0 && ANALYTICS.dataAttribute.length > 0;
}