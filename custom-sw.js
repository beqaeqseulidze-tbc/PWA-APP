// ეს ხაზი აუცილებელია, რომ Angular-ის სტანდარტული Service Worker-ის ფუნქციონალი (ქეშირება და ა.შ.) 
// არ დაიკარგოს.
importScripts('./ngsw-worker.js');

// ვუსმენთ notification-ის მოვლენებს რათა დავჰენდლოთ ნოტიფიკაციაზე იუზერის ქლიქი
window.addEventListener('notificationclick', (event) => {

  const notificationData = event.notification.data;

  // ვამოწმებთ, თუ არსებობს URL ჩვენს data ობიექტში
  if (notificationData && notificationData.url) {
    // ვხურავთ ნოტიფიკაციას
    event.notification.close();
    
    // ვეუბნებით ბრაუზერს, რომ დაელოდოს ახალი ფანჯრის გახსნას
    event.waitUntil(
      clients.openWindow(notificationData.url)
    );
  }
});