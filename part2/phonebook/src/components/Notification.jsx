const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <section className={`notification ${notification.type}`} role="alert">
            {notification.message}
        </section>
    )
}

export default Notification