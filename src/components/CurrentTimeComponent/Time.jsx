import React, { useState, useEffect } from "react";

function Time() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    // setTime(Date().toLocaleString());
    const current = new Date();
    // By default US English uses 12hr time with AM/PM
    const timee = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setTime(timee);
  });

  return <div>{time}</div>;
}

export default Time;
