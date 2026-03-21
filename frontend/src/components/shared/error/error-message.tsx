import { CircleAlert } from "lucide-react";

interface ErrorMessageProps {
  message: string | unknown;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="bg-red-400 rounded-sm p-2 flex items-center gap-2">
      {typeof message === "string" ? (
        <>
          <CircleAlert size={16} />
          <span className="text-sm">{message}</span>
        </>
      ) : (
        <>{message}</>
      )}
    </p>
  );
}
