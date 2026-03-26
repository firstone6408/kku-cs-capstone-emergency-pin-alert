export const format = {
  /**
   * Truncates a given text to a maximum length, and appends a suffix if the text is longer than the maximum length.
   * @param {string | null | undefined} text - the text to be truncated
   * @param {number} maxLength - the maximum length of the text
   * @param {object} options - optional configuration options
   * @param {string} options.suffix - the suffix to be appended if the text is longer than the maximum length (default: "...")
   * @param {boolean} options.trim - whether to trim the text before truncating (default: true)
   * @returns {string} the truncated text
   */
  truncateText: (
    text: string | null | undefined,
    maxLength: number,
    options?: {
      suffix?: string; // default "..."
      trim?: boolean; // default true
    },
  ) => {
    if (!text) return "-";

    const { suffix = "...", trim = true } = options || {};

    const value = trim ? text.trim() : text;

    if (maxLength <= 0) return "";

    return value.length > maxLength
      ? value.slice(0, maxLength) + suffix
      : value;
  },
};
