// import { Message, MessageBox } from 'element-ui'

const actions = {
    async [_M.WSS_CONNECT]({ commit, dispatch, rootGetters }, payload) {
        // const wss = await new WebSocket(
        //     // `wss://dstream.binance.com/ws/${rootGetters.listenKey}`
        //     `wss://dstream.binance.com:9443/ws/btcusdt@miniTicker`
        // )
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
