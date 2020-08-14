'use strict'

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
function readLines({ input }) {
  const output = new stream.PassThrough({ objectMode: true });
  const rl = readline.createInterface({ input });
  rl.on("line", line => { 
    output.write(line);
  });
  rl.on("close", () => {
    output.push(null);
  }); 
  return output;
}
const input = fs.createReadStream("cross-street-index/132122223113.json");



let geojson = { 
    type: "FeatureCollection",
    features: []
}

const main = async () => {
    for await (const line of readLines({input})) {
        let obj = JSON.parse(line);
        let feature = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: []
            },
            properties: {
                name: ""
            }
        }
        for (let k in obj) {
            feature.geometry.coordinates = obj[k];
            feature.properties.name = k;
        }
        geojson.features.push(feature);
    }
    console.log(JSON.stringify(geojson, null, "  "));
}

main();