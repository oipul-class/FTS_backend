module.exports = {
  async store(req, res) {
    try {
      return console.log(req.file);
      ;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
