composer identity request -c ADMIN -d "./identityFiles/"$1 -u admin -s adminpw | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" > ./lib/tmp/$1