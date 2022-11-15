// const MONGO_URL="mongodb://localhost:27017"
module.exports={
    MONGO_URL:"mongodb://nodeServer:IB5YRlpvCV4SMIUL@cluster0-shard-00-00.n1cqz.mongodb.net:27017,cluster0-shard-00-01.n1cqz.mongodb.net:27017,cluster0-shard-00-02.n1cqz.mongodb.net:27017/?ssl=true&replicaSet=atlas-k4u7us-shard-0&authSource=admin&retryWrites=true&w=majority",
    CORS_ORIGIN_URL:"http://localhost:3000",
    PORT:process.env.PORT || 5000,
    MAX_AGE:1000*60*60*24
}