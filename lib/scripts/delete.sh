composer card delete -c $1 > ./lib/tmp/trash.out &
rm ./lib/tmp/*
rm ./cards/*
rm ./tmp/* -r
rm ./Uploads/* -r
rm $2