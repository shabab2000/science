import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

const Test = () => {
  useEffect(() => {
    OneSignal.init({
      appId: "990d72d4-9b93-4ae6-a44d-f3d98938b036",
    });
  }, []);

  const handleNotification = () => {
    OneSignal.sendNotification("Hello, world!");
  };

  return (
    <div>
      <button onClick={handleNotification}>Send Notification</button>
    </div>
  );
};

export default Test;
