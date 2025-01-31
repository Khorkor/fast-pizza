import { FC, MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  className?: string;
  type: "primary" | "small" | "round" | "secondary";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
  children,
  disabled,
  to,
  className,
  type,
  onClick,
}) => {
  const base =
    "text-stone-800 text-sm inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to) {
    return (
      <Link className={`${styles[type]} ${className}`} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles[type]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
