// models/Counter.js
const { mongoose } = require('../configs/dbConnection')

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },  // Sayaç adı (örn. 'admissionNumber')
    seq: { type: Number, default: 0 }  // Sayaç değeri (başlangıçta 0, her artışta 1 artırılır)
},{
    collection: 'counter',
    timestamps: true
});


module.exports = mongoose.model('Counter', CounterSchema)
