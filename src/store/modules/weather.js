import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading_data: false,
        weatherData: [
            {
                station: 'stadium',
                title: 'Метеостанция на Стадионе',
                data: {}
            },
            {
                station: 'top',
                title: 'Верхняя Метеостанция',
                data: {}
            },
            {
                station: 'bottom',
                title: 'Нижняя Метеостанция',
                data: {}
            }
        ]
    },
    getters: {
        weatherData(state){
            return state.weatherData
        },
        loading_data(state){
            return state.loading_data
        }
    },
    mutations: {
        setData_err(state, wData){
            let sData = wData[0];
            let tData = wData[1];
            let bData = wData[2];

            state.weatherData[0].data = {
                time: sData[0],
                temp: sData[1],
                temp_d: sData[2],
                temp_c: sData[3],
                r: sData[4],
                wind_d: sData[5],
                wind_s: sData[6],
                wind_max: sData[7],
                mor: sData[11],
                w_w: sData[13],
                pr10: sData[14],
                p: (Math.round((sData[15] * 0.750062)*10))/10,
                qff: sData[16],
                qnh: sData[17],
                temp_g: sData[17],
                temp_s: sData[18]
            };
            state.weatherData[1].data = {
                time: tData[0],
                temp: tData[1],
                temp_d: tData[2],
                r: tData[4],
                temp_g: tData[17],
                temp_s: tData[18]
            };
            state.weatherData[2].data = {
                time: bData[0],
                temp: bData[1],
                temp_d: bData[2],
                r: bData[4],
                temp_g: bData[17],
                temp_s: bData[18]
            }
        },
        setData_ok(state, wData){
            let sData = wData[0];
            let tData = wData[1];
            let bData = wData[2];

            state.weatherData[0].data = {
                time: sData[0],
                temp: sData[1],
                temp_d: sData[2],
                temp_c: sData[3],
                r: sData[4],
                wind_d: sData[5],
                wind_s: sData[6],
                wind_max: sData[7],
                mor: sData[11],
                w_w: sData[13],
                pr10: sData[14],
                p: (Math.round((sData[15] * 0.750062)*10))/10,
                qff: sData[16],
                qnh: sData[17],
                temp_g: sData[18],
                temp_s: sData[19]
            };
            state.weatherData[1].data = {
                time: tData[0],
                temp: tData[1],
                temp_d: tData[2],
                r: tData[4],
                temp_g: tData[18],
                temp_s: tData[19]
            };
            state.weatherData[2].data = {
                time: bData[0],
                temp: bData[1],
                temp_d: bData[2],
                r: bData[4],
                temp_g: bData[18],
                temp_s: bData[19]
            }
        },
        setLoading(state, data){
            state.loading_data = data;
        },
        getLoadingState(state){
            return state.loading_data
        }
    },
    actions: {
        getData(store){
            store.commit('setLoading', true);
            axios.get('http://raduga-stadium.ru/php/Request.php').then( response => {
                if (response.data[3] === 21){
                    store.commit('setData_err', response.data);
                }
                else {
                    store.commit('setData_ok', response.data);
                }
                // console.log(response.data);
            }).then( () => {
                store.commit('setLoading', false);
                // store.dispatch('log')
            }).catch( e => {
                console.log(e.body)
            })
        },
        // log(){
        //     axios.get('http://weather.raduga-stadium.ru/php/log.php').then( data => {
        //         console.log(data.data);
        //     })
        // }
    }
}