import { defineStore } from 'pinia'

export const auth = defineStore('Auth', {
    state: () => ({
        isLoggedIn: !!localStorage.getItem('loggedIn') || false
    }),
    actions: {
        setLoggedIn(loggedIn) {
            localStorage.setItem('loggedIn', loggedIn)
            this.isLoggedIn = true
        },
        clearLoggedIn() {
            localStorage.removeItem('loggedIn')
            this.isLoggedIn = false
        },
    }
})