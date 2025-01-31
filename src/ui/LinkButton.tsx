import { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LinkButtonProps {
  children: ReactNode;
  to: string;
  className?: string;
}

const LinkButton: FC<LinkButtonProps> = ({ children, className, to }) => {
  const navigate = useNavigate();
  const LinkStyle = "text-sm text-blue-500 hover:text-blue-700 hover:underline";

  if (to === "-1") {
    return (
      <button
        className={`${LinkStyle} ${className}`}
        onClick={() => navigate(-1)}
      >
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={`${LinkStyle} ${className}`}>
      {children}
    </Link>
  );
};

export default LinkButton;
