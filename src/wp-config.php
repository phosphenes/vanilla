<?php


define('FS_METHOD', 'direct');




/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'drw');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'YouKn!ght3d_Ou!_$t@nD');
//define('DB_PASSWORD', 'oskom');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');
//define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
//define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
//define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'S`@nn>$&EAOPrDWL2JR0:cJ SL9Erys~KsGNX$-cz7qSt>$0M RXZYHW5/pEm81S');
define('SECURE_AUTH_KEY',  'c.OR8IyoF$Fe`=9s?Sl%!${2u:;l0=c27K%h<*O]*B4,E).wcNP0J1sP5+0@k= p');
define('LOGGED_IN_KEY',    'Zrm)>A- ^bw]CWBm[)qM6eD4k|> jHXOqObmiM$1()vh=t)%T=0MN,[: _sJg$B`');
define('NONCE_KEY',        '(GK03E`.z}AyJ25KtEP*#[8xU;-/i{qz^$Y^sy%khuSJWI5XYB+!O2PD[S<ea0]J');
define('AUTH_SALT',        '<+!,}U{FR(xxEvCX{<=GWua3Wmsjo0YHa75y*pAzw5Ax13bd8@]E!bR4+IBUKZJ+');
define('SECURE_AUTH_SALT', 'I}:#$//=|I>^oJ<E} <M;PFC}|QV g|^0#-seX]5*A>>N$*d8`#<sTKtn`$@g;1G');
define('LOGGED_IN_SALT',   'kXra6LgEaw<6eq3,W}92OfRuQ3SH(c@%HNOv9I>]BLQq,[CF#|FyOYb <hvN+@-l');
define('NONCE_SALT',       'I^d({%j}6<}#tb*c:Z2;)%g4cy jH(>2W]q4#Wa0K{ O v)>J2brnz =A`~ld$ ;');

/**#@-*/



/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'uc_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');