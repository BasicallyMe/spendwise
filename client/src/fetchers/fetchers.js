async function getUserData() {
  let status = null;
  try {
    const res = await fetch("http://localhost:5000/user/data", {
      method: "GET",
      credentials: "include",
    });
    status = await res.status;
    const response = await res.json();
    return { response, status };
  } catch (err) {
    console.log(err);
  }
//   if (status === 403 || status === 401) {
//     navigate("/signin", { replace: true });
//   }
}

async function getTransactions() {
  try {
    const res = await fetch("http://localhost:5000/user/transaction", {
      method: "GET",
      credentials: "include",
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export { getUserData, getTransactions }