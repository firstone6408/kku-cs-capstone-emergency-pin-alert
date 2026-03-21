interface ErrorMessageProps {
  message: string | unknown;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="bg-red-400 rounded-sm p-2 flex items-center gap-2">
      {typeof message === "string" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-circle-alert-icon lucide-circle-alert"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <span className="text-sm">{message}</span>
        </>
      ) : (
        <>{message}</>
      )}
    </p>
  );
}
