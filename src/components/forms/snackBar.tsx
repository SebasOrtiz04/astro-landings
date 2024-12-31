import { useEffect } from "react";


// Define las opciones válidas para `status`
export type SnackStatus = "success" | "error" | "warning" | "info";

// Define el tipo para las clases CSS asociadas a cada estado
export type StatusStyles = Record<SnackStatus, string>;

export interface SnackBarProps {
  text: string; // Texto del snackbar
  open: boolean; // Si el snackbar está abierto o cerrado
  handleClose: () => void; // Función para manejar el cierre
  status?: SnackStatus; // Estado del snackbar, con un valor predeterminado de 'info'
}

const SnackBar: React.FC<SnackBarProps> = ({ text, open, handleClose, status = "info" }) => {
  
  const statusStates: StatusStyles = {
    success: "bg-green-400 text-white",
    error: "bg-red-400 text-white",
    warning: "bg-yellow-400 text-secondary",
    info: "bg-blue-400 text-white",
  };

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => handleClose(), 3000);
    return () => clearTimeout(timer);
  }, [open, handleClose]);

  return (
    <div
      className={`fixed top-10 z-50 flex items-center justify-center 
            w-full max-w-[400px] gap-3 rounded-lg p-2 shadow-xl 
            ${open ? "translate-y-0" : "-translate-y-full"} 
            transition-all duration-300 ease-in-out
            ${statusStates[status]}`}
    >
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <span className="text-bold">{text}</span>
      </div>
    </div>
  );
};

export default SnackBar;
