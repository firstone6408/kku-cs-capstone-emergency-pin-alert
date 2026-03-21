interface HelloWorldContainerProps {
  message: string;
}

export function HelloWorldContainer({
  message,
}: HelloWorldContainerProps) {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
