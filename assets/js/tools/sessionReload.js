var session_reload = true;

if (session_reload) {
    caches.open('v1').then(function(cache) {
        cache.delete('img/icons/arrow_closed.png').then(function(response) {
        });
        cache.delete('css/myfiles/directories.css').then(function(response) {
        });
        cache.delete('css/myfiles/context_menu.css').then(function(response) {
        });
    });
};