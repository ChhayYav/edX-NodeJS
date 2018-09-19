const https = require('https')
const fs = require('fs')
const csv = require('csvjson')
const path = require('path')
const url = 'https://prod-edxapp.edx-cdn.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+2T2018+type@asset+block/customer-data.csv'


https.get(url, (response) => {
    let rawData = ''
    response.on('data', (chunk) => {
        rawData += chunk
    })
    response.on('end', () => {
        try {
            var csvData = rawData
            const jsonData = csv.toObject(csvData,",")

            const folderName = 'json'
            if(!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName) 
            }
            fs.writeFileSync(path.join(__dirname, folderName, 'customer.json'), JSON.stringify(jsonData, null,2), 'utf-8')
            console.log('cat json/customer.json to see data file')
            //console.log(jsonData)
        } catch (e) {
          console.error(e.message)
        }
    })
}).on('error', (error) => {
  console.error(`Got error: ${error.message}`)
})
