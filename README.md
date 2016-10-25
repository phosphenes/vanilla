##UC Base Site

Here's the new thing. The old thing sucked m'balls.

switcher queries:

```
UPDATE wp_options SET option_value = replace(option_value, 'http://weddings.jgarnerphoto.com','http://kgarner.uc.com') WHERE option_name = 'home' OR option_name = 'siteurl'
UPDATE wp_posts SET guid = replace(guid, 'http://weddings.jgarnerphoto.com','http://kgarner.uc.com')
UPDATE wp_posts SET post_content = REPLACE(post_content, 'http://weddings.jgarnerphoto.com','http://kgarner.uc.com')
UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'http://weddings.jgarnerphoto.com','http://kgarner.uc.com')
```


tunnel to use [my_subdomain].unitedcreations.xyz database:
```
ssh -L 127.0.0.1:3306:127.0.0.1:3306 uc_ftp@unitedcreations.xyz -N
```


TODO: API REF goes here!!!
