##UC Base Site

Here's the new thing. The old thing sucked m'balls.

switcher queries:

```
UPDATE uc_options SET option_value = replace(option_value, 'http://vanilla.unitedcreations.xyz','http://drw.unitedcreations.xyz') WHERE option_name = 'home' OR option_name = 'siteurl'
UPDATE uc_posts SET guid = replace(guid, 'http://vanilla.unitedcreations.xyz','http://drw.unitedcreations.xyz')
UPDATE uc_posts SET post_content = REPLACE(post_content, 'http://vanilla.unitedcreations.xyz','http://drw.unitedcreations.xyz')
UPDATE uc_postmeta SET meta_value = REPLACE(meta_value, 'http://vanilla.unitedcreations.xyz','http://drw.unitedcreations.xyz')
```


tunnel to use [my_subdomain].unitedcreations.xyz database:
```
ssh -L 127.0.0.1:3306:127.0.0.1:3306 uc_ftp@unitedcreations.xyz -N
```


TODO: API REF goes here!!!
