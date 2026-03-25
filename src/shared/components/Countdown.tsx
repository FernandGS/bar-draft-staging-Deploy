import { useEffect, useState } from 'react'

const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

const Countdown =() => {
    const matchDate = new Date("2026-03-25T21:00:00");
    const [time, setTime] = useState({ d: "--", h: "--", m: "--", s: "--"});

    useEffect(() => {
        const tick =() => {
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
    }, []);

    return (
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
          <span className="sm:text-4xl md:text-5xl lg:6xl font-bold text-brand-crimson">{value}</span>
          <span className="text-xs text-brand-crimson mt-1">{label}</span>
        </div>
        </>
      ))}
      </div>
    );
};

export default Countdown;