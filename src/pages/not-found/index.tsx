import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <div>
      <h1 className="text-6xl">404</h1>
      <p>
        A página <span className="font-bold">{location.pathname}</span> não foi
        encontrada.
      </p>
    </div>
  );
}
