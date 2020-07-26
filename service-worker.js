// nama cache
const CACHE_NAME = "movie-pwa-v2";

// daftar aset dan halaman mana saja yang akan disimpan ke dalam cache.
var urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/css/materialize.min.css",
  "/assets/css/style.css",
  "/assets/img/logo.png",
  "/assets/img/logo-white.png",
  "/assets/img/favicon-16x16.png",
  "/assets/img/favicon-32x32.png",
  "/assets/img/android-chrome-192x192.png",
  "/assets/img/android-chrome-512x512.png",
  "/assets/img/favicon.ico",
  "/assets/img/apple-touch-icon.png",
  "/assets/img/jodohku-yang-mana.jpg",
  "/assets/img/mangga-muda.jpg",
  "/assets/img/suara-dari-dilan.jpg",
  "/assets/img/teman-kondangan.jpg",
  "/assets/img/tersanjung.jpg",
  "/assets/img/toko-barang-mantan.jpg",
  "/assets/img/action-and-adventure.jpg",
  "/assets/img/comedies.jpg",
  "/assets/img/romantic.jpg",
  "/pages/home.html",
  "/pages/trends.html",
  "/pages/collection.html",
  "/pages/category.html",
  "/pages/about.html",
  "/navigation/navigation.html",
  "/assets/js/materialize.min.js",
  "/assets/js/initialize.js",
];

// daftarkan event listener untuk event install yang akan dipanggil
// setelah proses registrasi service worker berhasil
self.addEventListener("install", function (event) {
  event.waitUntil(
    //   open cache-storage
    caches.open(CACHE_NAME).then(function (cache) {
      // menyimpan aset ke dalam cache tersebut sejumlah daftar aset
      // yang sudah kita buat pada variable urlsToCache menggunakan method cache.addAll().
      return cache.addAll(urlsToCache);
    })
  );
});

// menggunakan aset yang sudah disimpan di cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          // SW load data dari cache
          return response;
        }
        // SW load data dari server
        return fetch(event.request);
      })
  );
});

// membuat mekanisme penghapusan cache yang lama agar tidak membebani pengguna.
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
