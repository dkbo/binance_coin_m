// import { Message, MessageBox } from 'element-ui'

const actions = {
    async [_M.WSS_CONNECT]({ commit, dispatch, rootGetters }, payload) {
        const wss = await new WebSocket(
            `wss://stream.binance.com:9443/ws/!ticker@arr`
        )
        const wss2 = await new WebSocket(
            `wss://dstream.binance.com/ws/!miniTicker@arr`
        )
        wss.onmessage = (stream) => {
            const { data } = stream
            const arr = JSON.parse(data)
            let obj = {}
            arr.forEach((ticker) => {
                obj[ticker.s] = ticker
            })
            commit(_M.SET_TEMP_DATA, {
                temp: 'tickers',
                data: {...rootGetters.tickers, ...obj}
            })
        }
        wss2.onmessage = (stream) => {
            const { data } = stream
            const arr = JSON.parse(data)
            let obj = {}
            arr.forEach((ticker) => {
                obj[ticker.s] = ticker
            })
            commit(_M.SET_TEMP_DATA, {
                temp: 'tickers2',
                data: {...rootGetters.tickers2, ...obj}
            })
        }
        // wss.onopen = () => {
        //     wss.send(JSON.stringify({
        //         method: 'SUBSCRIBE',
        //         params: [
        //             `bnbusdt@miniTicker` // request name 1
        //         ],
        //         id: 12 // request ID.
        //     }))
        // }
        // console.log(wss)
    }
}

export default {
    actions
}
