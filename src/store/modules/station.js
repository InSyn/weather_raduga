export default {
    namespaced: true,
    state: {
        realTime: {}
    },
    getters: {
        realTime(state){
            return state.realTime
        }
    },
    mutations: {
        setRealTime(state, data){
            let hh;
            let mm;
            let ss;

            data.hh.toString().length <= 1?
                hh = '0'+data.hh.toString():
                hh = data.hh;
            data.mm.toString().length <= 1 ?
                mm = '0'+data.mm.toString():
                mm = data.mm;
            data.ss.toString().length <= 1?
                ss = '0'+data.ss.toString():
                ss = data.ss;

            state.realTime = {
                hh: hh,
                mm: mm,
                ss: ss
            }
        }
    },
    actions: {
        setRealTime(store){
            let time = new Date();
            store.commit('setRealTime', {
                hh: time.getHours(),
                mm: time.getMinutes(),
                ss: time.getSeconds(),
            });
            setInterval(()=>{
                let time = new Date();
                store.commit('setRealTime', {
                    hh: time.getHours(),
                    mm: time.getMinutes(),
                    ss: time.getSeconds(),
                });
            }, 1000)
        }
    }
}