import './ErrorMessage.css'


const ErrorMessage = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div className="error">
            <p>{message}</p>
        </div>
    )
}

export default ErrorMessage