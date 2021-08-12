# kis9a - sources

## Workflow

### Installation

install script: [install](./install)  
curl -sL https://raw.githubusercontent.com/kis9a/kis9a/master/sources/install | bash  
cd \$PROFILE  
\$PROFILE dist  
make link

### Development

make server-sources # alias ss  
make serve-zenn # alias sz

### Commands

\# if $PROFILE=kis9a

kis9a server # serve dist/  
kis9a bundle # bundle src to dist  
kis9a images -r # resize  
kis9a images -c # comvert  
kis9a images -d # developmode  
kis9a data # initialize datas  
kis9a dist # initialize dist directory

### Deployment

make publish-sources # alias pbs  
make publish-zenn # alias pbz

use [github-pages](https://github.com/tschaub/gh-pages) @3.0 for push each branches

github actions

- [terraform](../.github/workflows/terraform.yml) on change sources/terraform/\*
- [publish](../.github/workflows/publish.yml) on push dist branch upload to s3
- [rss](../.github/workflows/rss.yml) bynary zip and upload s3 bucket.

### infrastructure

- s3 + cloudfront + acm + route53 + lambda@Edge

why ?

- cloudfront cach is powerful and preformance.
- I used before Github Pages but it's can't cache-controll

why use lambda@Edge ?

- when case of s3 object access, sub directory index.html can't resolve.  
  redirect to subdirectory index.html when origin request sub-directory/

[example-redirect-function](./terraform/folder_index_redirect.js)

### Options

##### - javascript poricy

- don't use npm module  
  use modules/\*.esm.js

##### - xml parse

- [sources/rss](./rss) for parse xml zenn feed <https://zenn.dev/kis9a/feed>.
- [.github/workflows/rss.yml](../.github/workflows/terraform.yml) bynary zip and upload s3 bucket.
- API Gateway endpoint <https://9806nuljwd.execute-api.ap-northeast-1.amazonaws.com/default/kis9a-rss-feed>

##### - components catalog page

- https://me.kis9a.com/components/

##### - whatch file changes

- use [sar](https://github.com/kis9a/sar) command  
  go get https://github.com/kis9a/sar
  (cd $PROFILE/sources/; sar)

##### - images compress action

- [imgcmp](../.github/workflows/imgcmp.yml) for compress images.

##### - data images to webp

- brew install webp
- cd $PROFILE/images
- for file in _; do cwebp "\$file" -o "${file%._}.webp"; done

##### - data images .png to .jpg

- ls -1 \*.png | xargs -n 1 bash -c 'convert "$0" "${0%.png}.jpg"'

##### - data images convert

- ffp='ffprobe -hide\*banner -show_format'
- ffimg='ls \*(.png|.jpg) | fzf -m --prompt="twimg" | xargs -I {} sips -Z 720 {}'
- ff2gif='ls \_(.mp4|.mov) | fzf -m --prompt="tw2gif" | xargs -I {} ffmpeg -y -i {} -vf scale="720:trunc(ow/a/2)\_2" -r 10 {}.gif'
- ffmov2mp4='ls \_.mov | fzf -m --prompt="twmov2mp4" | xargs -I {} ffmpeg -y -i {} -vf scale="720:trunc(ow/a/2)\_2" {}.mp4'
- ffgif2mp4='ls \_.gif | fzf -m --prompt="gif2mp4" | xargs -I {} ffmpeg -y -i {} -vf scale="720:trunc(ow/a/2)\*2" {}.mp4'

### Preformance

- PageSpeed Insights based Lighthouse, example:
  <https://developers.google.com/speed/pagespeed/insights/?url=me.kis9a.com/&tab=desktop>
  <https://developers.google.com/speed/pagespeed/insights/?url=me.kis9a.com/images/&tab=desktop>

### Improvement

- components manage and easy to distribute
- data files lifecycle with golang
- terraform clean up and more cover management resources
- gh-pages command self made
- abstract and separation for application and devOps staff
- [x] incremental bundle -> use esbuild watch function ? -> other project
- [x] cache lifecycle invalidate on s3 upload.
      x stale-while-revalidate: Cache-Control: max-age=600, stale-while-revalidate=30
- [x] API Gateway + AWS Lambda self hostring RSS parsed JSON API
