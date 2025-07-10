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

// Sanitize pasted input to allow only numeric characters
export const sanitizeOnPaste = (e: ClipboardEvent) => {
  const pasted = e.clipboardData?.getData("text") ?? "";
  const sanitized = pasted.replace(/[^\d]/g, ""); // Remove all non-digit characters

  if (sanitized !== pasted) {
    e.preventDefault();
    // Create a new input event with the sanitized value
    const target = e.target as HTMLInputElement;
    if (target) {
      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      const value = target.value;
      const newValue =
        value.substring(0, start) + sanitized + value.substring(end);
      target.value = newValue;
      target.setSelectionRange(
        start + sanitized.length,
        start + sanitized.length
      );
      target.dispatchEvent(new Event("input", { bubbles: true }));
    }
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
