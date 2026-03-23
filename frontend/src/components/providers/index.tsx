import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./theme-provider";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
}
