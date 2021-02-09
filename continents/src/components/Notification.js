import '../styles/notification.css'

const Notification = ({resObj}) => {
  console.log('resobj is : ',resObj)
const {error,info} = resObj
    console.log(`error is ${error} and info is ${info}`)
  if (!error && !info) {
    return null
  }

  return (
      <div className={error?"error":"info"}>
      {error||info}
    </div>
  )
}

export default Notification
