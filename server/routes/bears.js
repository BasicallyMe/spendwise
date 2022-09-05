const bears = [
  "Polar Bear",
  "Grizzly Bear",
  "Black Bear",
  "Brown Bear",
  "Kermode Bear",
  "Giant Panda",
  "Sloth Bear",
  "Giant Panda Bear"
];

module.exports = () => {
    return (req, res, next) => {
        res.data = bears;
        next();
    }
}