function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define('API_KEY', '6373c2198af2463c9d54b6eb57b3dba5');
define('BASE_URL', 'https://bungie.net/Platform/');
define('TO_UNSIGNED_INT_CONVERTER', '4294967296');
define('MANIFEST_PATH','./../assets/manifest/manifest.content');
