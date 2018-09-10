composer card delete -c $1 > ./lib/tmp/trash.out &
rm ./lib/tmp/*
rm ./cards/*.card
rm $2