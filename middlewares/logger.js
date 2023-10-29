const logger = (req, res, next) => {
  const { url, method, ip } = req;

  console.log(
    `${new Date().toLocaleString()} Effettuata richiesta ${method} all'endpoint ${url} da ip ${ip}`
  );

  next();
};

module.exports = logger;
