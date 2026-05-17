export type ActionState<T = void> = {
  error?: string | null;
  success?: boolean;
  data?: T;
};
