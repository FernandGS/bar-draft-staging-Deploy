
interface StatCardProps {
    number: string,
    text: string,
}

const StatCard = ({ number, text } : StatCardProps) => {
    return (
        <>
        <div className="relative flex justify-between">
            <div className="relative grid grid-rows-2 justify-items-start">
                <h2 className="font-bold text-[50px] text-brand-crimson leading-none">{number}</h2>
                <p className="font-bold text-[16px] text-brand-gray-mid tracking-wider leading-none mt-1">{text}</p>
            </div>
        </div>
        </>
    )
}

export default StatCard;