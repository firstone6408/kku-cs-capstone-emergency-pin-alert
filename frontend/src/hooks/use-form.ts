import Sweetalert from "sweetalert2";
import { toast as Toast } from "react-toastify";

import {
  ActionType,
  ErrorActionType,
  InitialFormState,
  initialFormState,
} from "@/types/actions/action";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

function alert(state: InitialFormState, redirect: () => void) {
  // console.log(state);
  switch (state.alert) {
    case "sweetalert2":
      if (state.status === "expected-error") {
        Sweetalert.fire({
          icon: "error",
          title: state.message,
        });
      } else if (state.status === "server-error") {
        Sweetalert.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดกรุณาติดต่อผู้พัฒนาเว็บ " + state.message,
        });
      } else {
        Sweetalert.fire({
          icon: "success",
          title: "Success!",
          text: state.message,
        });
        redirect();
      }

      break;

    default:
      if (state.status === "expected-error") {
        Toast.error(state.message);
      } else if (state.status === "server-error") {
        Toast.error(
          `เกิดข้อผิดพลาดกรุณาติดต่อผู้พัฒนาเว็บ (Error: ${state.message})`,
        );
      } else {
        Toast.success(state.message);
        redirect();
      }
      break;
  }
}

function useFormNative(action: ActionType, route?: string) {
  const [error, setError] = useState<ErrorActionType>({});
  const [state, formAction, isPending] = useActionState(
    action,
    initialFormState,
  );
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.error) setError(state.error);

    if (state.message) {
      alert(state, () => {
        if (route) router.push(route);
      });
    }
  }, [state, route, router]);

  const clearError = useCallback(() => setError({}), []);

  return { state, formAction, error, clearError, isPending };
}

function useFormControlled(action: ActionType, route?: string) {
  const [error, setError] = useState<ErrorActionType>({});
  const [state, setState] = useState<InitialFormState>(initialFormState);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.error) setError(state.error);

    if (state.message) {
      alert(state, () => {
        if (route) router.push(route);
      });
    }
  }, [state, route, router]);

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await action(initialFormState, formData);
      setState(result);
    });
  };

  const clearError = useCallback(() => setError({}), []);

  return { state, error, formAction, clearError, isPending };
}

interface UseFormType {
  action: ActionType;
  redirectTo?: string;
  mode?: "controlled" | "native";
}

export function useForm({
  action,
  redirectTo,
  mode = "native",
}: UseFormType) {
  const controlled = useFormControlled(action, redirectTo);
  const native = useFormNative(action, redirectTo);

  return mode === "native" ? native : controlled;
}
