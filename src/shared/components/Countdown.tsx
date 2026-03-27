import { useEffect, useState } from 'react'
import { fetchNextMatch } from '../services/apifootball';

const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

const BARCA_MENS_ID = 529;
const BARCA_WOMENS_ID = 1918;

const Countdown = () => {
  const [matchDate, setMatchDate] = useState<Date | null>(null);
  const [matchName, setMatchName] = useState("");
  const [time, setTime] = useState({ d: "--", h: "--", m: "--", s: "--" });

  // 1. trae los datos de la API
  useEffect(() => {
    const loadSoonestMatch = async () => {
      
      console.log("1. Llamando a la API...")
      
      const [mens, womens] = await Promise.all([
        fetchNextMatch(BARCA_MENS_ID),
        fetchNextMatch(BARCA_WOMENS_ID),
      ]);

      console.log("2. Respuesta masculino:", mens)
      console.log("3. Respuesta femenino:", womens)

      const mensFixture = mens.response[0];
      const womensFixture = womens.response[0];

      console.log("4. Fixture masculino:", mensFixture)
      console.log("5. Fixture femenino:", womensFixture)

      const mensDate = new Date(mensFixture.fixture.date);
      const womensDate = new Date(womensFixture.fixture.date);

      console.log("6. Fecha masculino:", mensDate)
      console.log("7. Fecha femenino:", womensDate)

      const soonest = mensDate < womensDate ? mensFixture : womensFixture;

      console.log("8. Partido más próximo:", soonest)

      setMatchDate(new Date(soonest.fixture.date));
      setMatchName(`${soonest.teams.home.name} vs ${soonest.teams.away.name}`);
    };

    loadSoonestMatch();
}, []);

  // 2. arranca el countdown cuando ya tiene la fecha
  useEffect(() => {
    if (!matchDate) return;

    const tick = () => {
      const diff = matchDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        d: pad(diff / 86400000),
        h: pad((diff % 86400000) / 3600000),
        m: pad((diff % 3600000) / 60000),
        s: pad((diff % 60000) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [matchDate]);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-brand-crimson mb-2">{matchName}</p>

      <div className="flex gap-6">
        {[
          { label: "días", value: time.d },
          { label: "horas", value: time.h },
          { label: "minutos", value: time.m },
          { label: "segundos", value: time.s },
        ].map(({ label, value }, i) => (
          <>
            {i > 0 && (
              <span key={`sep-${i}`} className="text-4xl font-bold text-brand-crimson mb-4">:</span>
            )}
            <div key={label} className="flex flex-col items-center">
              <span className="sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-crimson">{value}</span>
              <span className="text-xs text-brand-crimson mt-1">{label}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Countdown;