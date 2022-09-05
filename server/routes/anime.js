const names = [
  "Kageyama Tobio",
  "Hinata Shoyo",
  "Ryunosuke Tanaka",
  "Yu Nishinoya",
  "Daichi Sawamura",
  "Kei Tsukishima",
  "Asahi Azumane",
  "Koshi Sugawara",
];

module.exports = () => {
  return (req, res, next) => {
    res.data = names;
    next();
  };
};
