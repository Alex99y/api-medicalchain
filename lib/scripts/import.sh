composer card import -c $1 -f $2 | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" > ./lib/tmp/$1