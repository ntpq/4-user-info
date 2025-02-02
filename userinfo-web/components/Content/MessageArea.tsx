import React from "react"

function MessageArea({ data }: any) {
  const { time, theAddress, name } = data
  return (
    <div
      style={{
        backgroundImage: `url(./bg.jpg)`,
        width: "100%",
        minHeight: "600px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className="p-32 content-between grid "
    >
      <div>
        <p className="text-justify">Hi Everyone !</p>
        <p className="text-justify">{name}</p>
      </div>
      <div className="align-end">
        <div>{theAddress}</div>
        <div>{time}</div>
      </div>
    </div>
  )
}

export default MessageArea
