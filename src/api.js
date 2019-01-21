import axios from "axios";

axios.defaults.baseURL =
  "https://test-dot-solwit-pjatk-arc-2018-gr4.appspot.com";
if (localStorage.getItem("session"))
  axios.defaults.headers = {
    Authorization: localStorage.getItem("session")
  };

export default {
  join(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("/join", data)
        .then(response => {
          let session_id = response.data.session;
          axios.defaults.headers = {
            Authorization: session_id
          };
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
        .delete("/session/")
        .then(response => {
          localStorage.removeItem("session");
          context.commit("deleteSession");
          axios.defaults.headers = {};
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
          axios.defaults.headers = {
            Authorization: session_id
          };
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
          context.commit("createWorld", result.data.newWorld);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getPlayer(context, id) {
    return new Promise((resolve, reject) => {
      axios
        .get("/game/player/" + id)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  joinWorld(context, id) {
    return new Promise((resolve, reject) => {
      axios
        .post("/game/" + id + "/join")
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  upgradeBuilding(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("/game/upgrade/" + data.player + "/" + data.building.id + "/")
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  attack(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("/game/player/world/attack", data)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
