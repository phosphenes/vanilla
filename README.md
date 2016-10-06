##UC Base Site

Here's the new thing. The old thing sucked m'balls.

switcher queries:
```
UPDATE wp_options SET option_value = replace(option_value, 'OLD_URL','NEW_URL') WHERE option_name = 'home' OR option_name = 'siteurl'
UPDATE wp_posts SET guid = replace(guid, 'OLD_URL','NEW_URL')
UPDATE wp_posts SET post_content = REPLACE(post_content, 'OLD_URL','NEW_URL')
UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'OLD_URL','NEW_URL')
```
TODO: API REF goes here!!!
