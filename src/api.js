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
  },

  getWorldList(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("/game/worlds")
        .then(response => {
          context.commit("getWorldList", response.data.worldList);
          resolve(response.data.worldList);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getWorld(context, id) {
    return new Promise((resolve, reject) => {
      axios
        .get("/game/worlds/" + id)
        .then(result => {
          context.commit(
            "getWorld",
            result.data.World.map.sort((a, b) => {
              return a.num - b.num;
            })
          );
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createWorld(context, name) {
    return new Promise((resolve, reject) => {
      axios
        .post("/game/create/" + name)
        .then(result => {
          context.commit("createWorld", name);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
