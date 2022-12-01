const App = Vue.createApp({
    data() {
        return {
            Username: "",
            Password: "",
            showData: null
        }
    },
    methods: {
        user() {
            axios.post("http://localhost:5204/api/User", {
                username: this.Username,
                password: this.Password
            })
            .then(response => {
                console.log(response);
                this.showData = response
            })
        }
    }

});
App.mount('#app')



