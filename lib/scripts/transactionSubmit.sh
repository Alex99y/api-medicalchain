composer transaction submit -c $1 -d $2 | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" > ./lib/tmp/$1