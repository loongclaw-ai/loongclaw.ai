import type { FC } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useBreadcrumb } from "../hooks/useBreadcrumb";

const Breadcrumb: FC = () => {
  const items = useBreadcrumb();

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <Link to="/" className="breadcrumb-home-link">
        <Home size={14} />
      </Link>

      {items.map((item, index) => (
        <span key={item.path} className="breadcrumb-item">
          <span className="breadcrumb-separator">/</span>
          {index === items.length - 1 ? (
            <span className="breadcrumb-current">
              {item.label}
            </span>
          ) : (
            <Link to={item.path} className="breadcrumb-link">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
