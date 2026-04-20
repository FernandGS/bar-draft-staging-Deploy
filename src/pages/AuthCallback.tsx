import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../shared/services/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const finishAuth = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (!mounted) return;

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      if (data.session) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    void finishAuth();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">
        Procesando inicio de sesión...
      </h1>
      {error ? <p className="text-red-600">{error}</p> : <p>Redirigiendo...</p>}
    </div>
  );
}
