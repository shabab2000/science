import React, { useState } from "react";

const Test = () => {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      setPermission(permission);
    });
  };

  const showNotification = () => {
    if (permission === "granted") {
      new Notification("ข้อความที่ต้องการแจ้งเตือน");
    } else {
      Notification.requestPermission().then((permission) => {
        setPermission(permission);
      });
    }
  };

  return (
    <div>
      <button onClick={requestPermission}>ขออนุญาตแจ้งเตือน</button>
      <button onClick={showNotification}>แสดงการแจ้งเตือน</button>
    </div>
  );
};

export default Test;
