const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <secion className={`notification ${notification.type}`} role="alert">
            {notification.message}
        </secion>
    )
}

export default Notification