module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/user/dashboard",
        permanent: true,

      },
      {
        source: '/user',
        destination: '/user/dashboard',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/signin',
        permanent: true,
      }
    ];
  },
};