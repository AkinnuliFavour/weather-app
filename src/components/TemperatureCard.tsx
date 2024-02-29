import { dayValues, monthValues } from "../constants/constants"

interface Props {
  image: string,
  temp: string,
  dateString: string,
  text: string
}

const TemperatureCard = ({image, temp, dateString, text}: Props) => {
  const date = new Date(dateString)
  const day = date.getDay()
  const dayNumber = date.getDate()
  const month = date.getMonth()
  
  console.log(day)
  return (
    <div className="w-32 h-40 bg-[#33C3FF] rounded-2xl flex flex-col items-center justify-around shadow-inner">
      <img src={image} alt="" width={30}/>
      <p className="text-xs font-bold -mt-4 text-center">{text}</p>
      <p className="font-bold text-xl">{temp}&#176;c</p>
      <div className='text-center'>
        <p>{monthValues[month]} {dayNumber}</p>
        <p className="font-bold">{dayValues[day]}</p>
      </div>
    </div>
  )
}

export default TemperatureCard
