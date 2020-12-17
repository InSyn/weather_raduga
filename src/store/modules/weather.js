import axios from "axios";

export default {
  namespaced: true,
  state: {
    loading_data: false,
    weatherData: [
      {
        station: "stadium",
        title: "Метеостанция на Стадионе",
        data: {}
      },
      {
        station: "top",
        title: "Верхняя Метеостанция",
        data: {}
      },
      {
        station: "bottom",
        title: "Нижняя Метеостанция",
        data: {}
      }
    ]
  },
  getters: {
    weatherData(state) {
      return state.weatherData;
    },
    loading_data(state) {
      return state.loading_data;
    }
  },
  mutations: {
    setData(state, wData) {
      let sData = wData[0];
      let tData = wData[1];
      let bData = wData[2];
      let date = new Date();
      let now = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      };
      function dewPoint(temp, hum) {
        const a = 17.27;
        const b = 237.7;
        let gamma = (a * temp) / (b + temp) + Math.log(hum / 100);
        return ((b * gamma) / a - gamma).toFixed(1);
      }
      state.weatherData[0].data = {
        date: `${
          now.day.toString().length < 2
            ? "0" + now.day.toString()
            : now.day.toString()
        }/${
          now.month.toString().length < 2
            ? "0" + now.month.toString()
            : now.month.toString()
        }/${now.year.toString()[2] + now.year.toString()[3]}`,
        time: `${
          date.getHours().toString().length > 1
            ? date.getHours()
            : "0" + date.getHours()
        }:${
          date.getMinutes().toString().length > 1
            ? date.getMinutes()
            : "0" + date.getMinutes()
        }`,
        temp: sData["temperature"],
        temp_d: dewPoint(sData["temperature"], sData["humidity"]),
        temp_c: sData["apparent_temperature"],
        r: sData["humidity"],
        wind_d: sData["wind_direction_text_ru"],
        wind_s: sData["wind_speed"],
        vis: null,
        p: Math.round(sData["pressure"]),
        cond: sData["condition_text_ru"]
      };
      state.weatherData[1].data = {
        time: tData[0],
        temp: tData["temperature"],
        temp_d: dewPoint(tData["temperature"], tData["humidity"]),
        r: tData["humidity"],
        vis: null,
        cond: tData["condition_text_ru"]
      };
      state.weatherData[2].data = {
        time: bData[0],
        temp: bData["temperature"],
        temp_d: dewPoint(bData["temperature"], bData["humidity"]),
        r: bData["humidity"],
        vis: null,
        cond: bData["condition_text_ru"]
      };
    },
    setLoading(state, data) {
      state.loading_data = data;
    },
    getLoadingState(state) {
      return state.loading_data;
    }
  },
  actions: {
    getData: ({ commit }) => {
      commit("setLoading", true);
      axios
        .get("http://raduga-stadium.ru/php/Request.php")
        .then(response => {
          let arr = JSON.parse(response.data.html);
          commit("setData", arr["objects"][2]["stations"]);
        })
        .catch(e => {
          console.log(e);
        });
    }
    // log(){
    //     axios.get('http://weather.raduga-stadium.ru/php/log.php').then( data => {
    //         console.log(data.data);
    //     })
    // }
  }
};
