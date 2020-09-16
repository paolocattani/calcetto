export const CHAR_SET = 'utf-8';
export const DEFAULT_HEADERS = {
  Connection: 'keep-alive',
  'Content-Type': 'text/event-stream',
  // https://github.com/expressjs/compression/issues/72
  // https://github.com/expressjs/compression#compressionoptions
  'Cache-Control': 'no-transform',
};

// End of Message
export const EOM = '\n\n';
