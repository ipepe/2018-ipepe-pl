var CACHE = 'network-or-cache';
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
        return fromCache(evt.request);
    }));
});
function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            "assets/css/main.css",
            "assets/images/projects/skrimarket.jpg",
            "assets/images/projects/taxorder.jpg",
            "assets/images/projects/creator.jpg",
            "assets/images/education/alo.png",
            "assets/images/education/pjatk.png",
            "assets/images/project.jpg",
            "assets/images/header.jpg",
            "assets/js/main.js",
            "assets/resumes/Patryk_Ptasinski_Resume.pdf",
            "assets/libs/jquery/jquery-3.2.0.min.js",
            "assets/libs/boostrap/bootstrap.min.css",
            "assets/libs/font-awesome/css/font-awesome.css",
            "assets/libs/font-awesome/css/font-awesome.min.css",
            "assets/libs/font-awesome/scss/font-awesome.scss",
            "assets/libs/font-awesome/fonts/fontawesome-webfont.svg",
            "assets/libs/font-awesome/fonts/FontAwesome.otf",
            "assets/libs/font-awesome/fonts/fontawesome-webfont.woff2",
            "assets/libs/font-awesome/fonts/fontawesome-webfont.ttf",
            "assets/libs/font-awesome/fonts/fontawesome-webfont.woff",
            "assets/libs/font-awesome/fonts/fontawesome-webfont.eot",
            "contact.html",
            "danefirmy.html",
            "favicon.ico",
            "greatest_privacy_policy.html",
            "index.html",
            "LICENSE.md",
            "README.md",
            "s10623-pjwstk-thesis.zip",
            "thanks.html"
        ]);
    });
}
function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {

var timeoutId = setTimeout(reject, timeout);
fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}
function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}
