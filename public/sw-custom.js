self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Focus on existing window/tab if available, otherwise open a new one
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/DEFQON.1-timetable/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/DEFQON.1-timetable/');
      }
    })
  );
});
