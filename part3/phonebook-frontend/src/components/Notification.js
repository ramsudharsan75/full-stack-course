const Notification = ({ message, isError }) => {
    if (message === null) {
        return null;
    }

    const notificationStyle = {
        color: isError ? 'red' : 'green',
        border: isError ? '3px solid red' : '3px solid green'
    };

    return (
        <div className='notification' style={notificationStyle} >
            {message}
        </div>
    );
};

export default Notification;