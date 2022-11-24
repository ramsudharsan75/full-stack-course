const notificationComponent = (message, isError) =>
  <div className={isError ? "error" : "notification"} style={{ color: isError ? 'rgb(255, 0, 0)' : 'green' }}>
    {message}
  </div>

export default notificationComponent
