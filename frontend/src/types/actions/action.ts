export type StatusActionType =
  | "success"
  | "expected-error"
  | "server-error";

export type ErrorActionType = Record<string, string[]>;

export interface InitialFormState {
  status: StatusActionType;
  message?: string;
  error?: ErrorActionType;
  data?: unknown;
  alert?: "toast" | "sweetalert2";
}

export const initialFormState: InitialFormState = {
  status: "expected-error",
  message: "",
  alert: "toast",
};

export type ActionType = (
  _prevState: InitialFormState,
  formData: FormData
) => Promise<InitialFormState>;
