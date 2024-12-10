// initializeCounters.js

const Counter = require('../models/counter'); // Counter modelini import et

const initializeCounters = async () => {
    try {
        // Her sayaç için başlangıç değerini kontrol et ve gerekiyorsa oluştur
        const admissionNumber = await Counter.findOne({ name: 'admissionNumber' });
        if (!admissionNumber) {
            await Counter.create({ name: 'admissionNumber', seq: 1 }); // Başlangıç değeri
        }

        const protocolNumber = await Counter.findOne({ name: 'protocolNumber' });
        if (!protocolNumber) {
            await Counter.create({ name: 'protocolNumber', seq: 1 }); // Başlangıç değeri
        }

        console.log('Counters initialized successfully!');
    } catch (error) {
        console.error('Error initializing counters:', error);
    }
};

module.exports = initializeCounters;
