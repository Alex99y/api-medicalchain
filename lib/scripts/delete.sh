composer card delete -c $1 > ./lib/tmp/trash.out &
rm ./cards/* -f
rm ./Uploads/* -r -f
rm ./tmp/* -r -f
rm ./lib/tmp/* -f