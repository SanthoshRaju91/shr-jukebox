import unirest from "unirest";

function invoke(url, method = "GET", headers = {}, data = {}) {
  return new Promise((resolve, reject) => {
    const request = unirest(method, url);

    request.headers({
      ...headers
    });

    if (Object.keys(data).length) {
      if (data.form && Object.keys(data["form"]).length > 0) {
        request.form({
          ...data.form
        });
      }

      if (data.query && Object.keys(data["query"]).length > 0) {
        request.query({
          ...data.query
        });
      }
    }

    request.end(res => {
      if (res.error) {
        console.log(res.error);
        reject(res.error);
      }
      resolve(res.body);
    });
  });
}

export default invoke;
