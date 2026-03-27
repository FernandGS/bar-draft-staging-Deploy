import Countdown from '../shared/components/Countdown'
import { SecondaryButton } from '../shared/components/ButtonS';
import Noticias from '../shared/components/Noticias'
import StatCard from '../shared/components/StatCard'

function Home() {
    return (
        <>
            <section className="relative bg-cover bg-center h-screen flex items-center justify-center text-center bg-[url('https://www.fcbarcelona.com/photo-resources/2025/11/15/43dcea0d-71dc-414f-9bcc-4e827c927693/JCAG3702.jpg?width=3200&_gl=1*1t7pif5*_gcl_aw*R0NMLjE3NzMzNDE0MTcuQ2p3S0NBand5TW5OQmhCTkVpd0EtS2NndTVneXE2dEVQNGZldjVWZmNwa2dJRGZ0clpiZGxNZTVDZGNwTXo4UkNZUnFWVmZuM19GcW5Sb0NTNGdRQXZEX0J3RQ..*_gcl_dc*R0NMLjE3NzMzNDE0MTcuQ2p3S0NBand5TW5OQmhCTkVpd0EtS2NndTVneXE2dEVQNGZldjVWZmNwa2dJRGZ0clpiZGxNZTVDZGNwTXo4UkNZUnFWVmZuM19GcW5Sb0NTNGdRQXZEX0J3RQ..*_gcl_au*OTk4NjYyNjc0LjE3NzA5MjMxMDM.')]">
                <div className="relative py-5 mt-30 text-white">
                    <h2 className="sm:text-4xl md:text-5xl lg:6xl font-bold mb-4 font-sans tracking-tight">Benvinguts al FC Barcelona!</h2>
                </div>
            </section>

            <div className="relative pt-10 px-20">
                <div className="flex items-center justify-between mb-10">
                    <p className="text-[32px] font-sans text-black">Faltan...</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid grid-cols-2 gap-1 pt-1">
                        <span className="material-icons text-brand-gray-mid">sports_soccer</span>
                        <span className="material-symbols-outlined text-brand-crimson">chess_queen</span>
                        </div>
                        <SecondaryButton onClick={() => console.log("hola")} size="sm">Ver más</SecondaryButton>
                    </div>
                </div>
                <div className="flex justify-center my-15">
                    <Countdown />
                </div>
                <div className="flex justify-end mt-10">
                    <p className="text-[32px] font-sans text-black">... para vernos otra vez</p>
                </div>
                <hr className="mt-15 border-brand-gray-light" />
                <p className="py-10 text-[16px] font-sans text-brand-navy ">Lo Último</p>
                <p className="text-[48px] font-sans text-black">
                    <span className="text-black">Noticias del </span>
                    <span className="text-brand-yellow">Club</span>
                </p>
                <div className="relative">
                    <Noticias /> 
                </div>
                <div className="relative flex items-between my-20">
                    <div className="px-75 grid grid-cols-3 justify-between gap-30">
                        <StatCard number="2" text="Equipos" />
                        <StatCard number="124" text="Años de Historia" />
                        <StatCard number="400M+" text="Fans Globales" />
                    </div>
                </div>
                <img src='https://www.fcbarcelona.com/fcbarcelona/photo/2024/03/13/13a9d23d-c41b-4bf1-b6a8-ab5a4dfc3f3c/FCB_Oporto-035.jpg' />
               <div className="relative flex justify-center my-10">
                <h1 className="text-[54px] font-light text-brand-crimson">Més Que Un Club</h1>
               </div>

            </div>
        </>
    ) 
}

export default Home;