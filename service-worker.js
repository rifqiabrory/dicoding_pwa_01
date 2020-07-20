// nama cache
const CACHE_NAME = "movie-pwa-v1";

// daftar aset dan halaman mana saja yang akan disimpan ke dalam cache.
var urlsToCache = [
  "/",
  "/index.html",
  "/assets/img/icon.png",
  "/assets/css/style.css",
  "/assets/css/materialize.min.css",
  "/assets/js/materialize.min.js",
  "/assets/js/initialize.js",
  "/assets/dummy/data.json",
  "/assets/dummy/jodohku-yang-mana.jpg",
  "/assets/dummy/mangga-muda.jpg",
  "/assets/dummy/suara-dari-dilan.jpg",
  "/assets/dummy/teman-kondangan.jpg",
  "/assets/dummy/tersanjung.jpg",
  "/assets/dummy/toko-barang-mantan.jpg",
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
