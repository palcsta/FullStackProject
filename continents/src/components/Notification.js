import '../styles/notification.css'
import { MdErrorOutline, MdInfoOutline } from 'react-icons/md'
import { IconContext } from 'react-icons'

const Notification = ({resObj}) => {
  if (!resObj) {
    return null
  }
  const {error,info} = resObj

  return (
    <IconContext.Provider value={{ size: "1.5em", className: "notificationIcon" }}>
      <div className={error?"error":"info"}>
        {error?<MdErrorOutline/>:<MdInfoOutline/>}   {error||info}
      </div>
    </IconContext.Provider>
  )
}

export default Notification
