const fs = require("fs");

const fitxer = "./db/data.json";

const guardarDB = (data) => {
  fs.writeFileSync(fitxer, JSON.stringify(data));
};

const readDB = () => {
  console.log(fs.existsSync(fitxer));
  if (!fs.existsSync(fitxer)) {
    return null;
  }

  const info = fs.readFileSync(fitxer, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};


module.exports = {
  guardarDB,
  readDB,
};
