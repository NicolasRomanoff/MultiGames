export const typeGuardObject = (
  object: unknown,
): object is Record<string, unknown> => {
  return (
    object !== null && typeof object === "object" && !Array.isArray(object)
  );
};
