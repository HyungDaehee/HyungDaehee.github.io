// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("install", function (e) {
//     console.log("fcm sw install..");
//     // eslint-disable-next-line no-restricted-globals
//     self.skipWaiting();
//   });
  
//   // eslint-disable-next-line no-restricted-globals
//   self.addEventListener("activate", function (e) {
//     console.log("fcm sw activate..");
//   });
  
  // eslint-disable-next-line no-restricted-globals
  self.addEventListener("push", function (e) {
    console.log("push: ", e.data.json());
    if (!e.data.json()) return;
  
    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
      body: resultData.body,
      icon: resultData.image,
      tag: resultData.tag,
      ...resultData,
    };
    console.log("push: ", { resultData, notificationTitle, notificationOptions });
  
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
   // eslint-disable-next-line no-restricted-globals
   self.addEventListener("notificationclick", function (event) {
    console.log("notification click");
    const url = "/";
    event.notification.close();
    event.waitUntil(
        // eslint-disable-next-line no-restricted-globals
      self.clients
        .matchAll({ type: "window" })
        .then((clientList) => {
          if (clientList.length > 0) {
            // 클라이언트가 열려 있을 경우 해당 클라이언트로 포커스
            return clientList[0].focus();
          } else {
            // 클라이언트가 열려 있지 않을 경우 새 창 열기
            // eslint-disable-next-line no-restricted-globals
            return self.clients.openWindow(url);
          }
        })
    );
  });