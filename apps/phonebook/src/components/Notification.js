import './Notification.css';


const Notification = ({ message, alertLevel }) => {
    if (!message) {
        return null;
    }

    return (
        <div className={`notification notification--${alertLevel}`}>
            <p>{message}</p>
        </div>
    )
}

export default Notification