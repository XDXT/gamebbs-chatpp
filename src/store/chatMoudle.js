import io from 'socket.io-client'
import api from '@/assets/config/api'

export default {
    state: {
        socket: null,
    },
    mutations: {
        setSocket(state, socket) {
            state.socket = socket;
        },
        discardSocket(state) {
            state.socket.disconnect();
            state.socket = null;
        },
    },
    actions: {
        connectSocket: function (store) {
            if (store.state.socket != null) {
                return true;
            }
            let socket = null;
            let erro = null;
            try {
                // socket = io.connect(api.SocketUrl);
                socket = io.connect();
            } catch (error) {
                erro = error;
            }

            return new Promise((resolve, reject)=> {
                if (erro) {
                    reject(erro);
                } else {
                    setTimeout(() => {
                        if (socket.connected) {
                            store.commit('setSocket', socket);
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }, 800);
                }
            })
        }
    }
}