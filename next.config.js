module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/user/dashboard",
        permanent: true,

      },
    ];
  },
};