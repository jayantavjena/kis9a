brew install bitcoin

## start server on 8332 port

bitcoind
bitcoind --deamon

## get block example

bitcoin-cli getblockhash 0

req: metohd: POST, parasms: [0], id: 1
res: hash-number

## request with curl

rpcuser, rpcpassword が認証情報として必要

~/.bitcoin/bitcoin.conf

curl --user name ---data-binary 

