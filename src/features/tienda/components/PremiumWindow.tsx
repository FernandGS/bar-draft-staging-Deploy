type PremiumWindowPros = {
    onClose: () => void;
}

const PremiumWindow = ({ onClose }: PremiumWindowPros) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#A50044] to-[#800036] p-6 text-white text-center">
                <div className="text-3xl mb-2">👑</div>
                <h2 className="text-xl font-bold">Hazte Miembro Premium</h2>
                <p className="text-sm text-white/80 mt-1">Desbloquea beneficios exclusivos</p>
                </div>

                {/* Precio */}
                <div className="bg-yellow-50 border-y border-yellow-200 py-4 text-center">
                <span className="text-4xl font-extrabold text-[#A50044]">$50</span>
                <span className="text-gray-500 font-medium">/mes</span>
                <p className="text-xs text-gray-400 mt-1">Cancela cuando quieras</p>
                </div>

                {/* Beneficios */}
                <div className="p-6 space-y-3">
                {[
                    { icon: "🎟️", text: "Acceso a Rifas Exclusivas" },
                    { icon: "🏷️", text: "Descuentos Especiales" },
                    { icon: "🪙", text: "100 Monedas Bonus/Mes" },
                    { icon: "🏅", text: "Insignias Exclusivas" },
                ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <span className="text-gray-700 font-medium">{text}</span>
                    <span className="ml-auto text-green-500 font-bold">✓</span>
                    </div>
                ))}
                </div>

                {/* Botones */}
                <div className="px-6 pb-6 flex flex-col gap-3">
                <button
                    onClick={() => alert("Redirigir a pago")}
                    className="w-full bg-[#A50044] hover:bg-[#800036] text-white font-bold py-3 rounded-xl transition"
                >
                    Suscribirse Ahora
                </button>
                <button
                    onClick={onClose}
                    className="w-full text-gray-400 hover:text-gray-600 text-sm py-2 transition"
                >
                    Quizás más tarde
                </button>
                </div>

            </div>
        </div>
    );
};

export default PremiumWindow;