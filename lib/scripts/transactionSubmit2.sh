a="'"
echo $a$2$a | xargs composer transaction submit -c $1 -d | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" > ./lib/tmp/$1
