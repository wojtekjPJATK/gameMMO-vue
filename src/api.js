import axios from "axios";

axios.defaults.baseURL =
  "https://test-dot-solwit-pjatk-arc-2018-gr4.appspot.com";
axios.defaults.headers = {
  Authorization: localStorage.getItem("session") || ""
};

export default {
  join(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("/join", data)
        .then(response => {
          let session_id = response.data.session;
          localStorage.setItem("session", session_id);
          context.commit("session", session_id);
          resolve(response);
        })
        .catch(err => {
          console.log(err);
          console.log(err.data);
          reject(err);
        });
    });
  },

  logout(context) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/session/" + this.state.id)
        .then(response => {
          localStorage.removeItem("session");
          context.commit("deleteSession");
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  signin(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("/signin", data)
        .then(response => {
          let session_id = response.data.session;
          localStorage.setItem("session", session_id);
          context.commit("session", session_id);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
