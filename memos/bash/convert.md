convert imagename.jpg -resize 800
https://www.lifewire.com/convert-linux-command-unix-command-4097060

fd | grep -v RE | grep -e jpg -e png -e webp | xargs file | grep -v 480 | awk '{ print $1 }' | tr -d ':' | xargs -I {} convert {} -resize 480 {}
