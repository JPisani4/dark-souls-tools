// ~/utils/inputSanitizers.ts

// Allow only number keys and control/navigation
export const onlyAllowNumbers = (e: KeyboardEvent) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Home",
    "End",
    "Enter",
  ];
  const isNumberKey = /^[0-9]$/.test(e.key);

  if (!isNumberKey && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

// Prevent pasting non-numeric input
export const sanitizeOnPaste = (e: ClipboardEvent) => {
  const pasted = e.clipboardData?.getData("text") ?? "";
  if (!/^\d+$/.test(pasted.trim())) {
    e.preventDefault();
  }
};

export const parseLevel = (value: string): number | null => {
  const n = parseInt(value, 10);
  if (isNaN(n) || n < 1 || n > 713) return null;
  return n;
};

export const isValidLevel = (n: number | null): boolean => {
  return n !== null && n >= 1 && n <= 713;
};
