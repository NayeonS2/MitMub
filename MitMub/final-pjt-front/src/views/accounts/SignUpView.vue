<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="signUp">
            <label for="username">username : </label>
            <input type="text" id="username" v-model="username"><br>

            <label for="password1">password1 : </label>
            <input type="text" id="password1" v-model="password1"><br>

            <label for="password2">password2 : </label>
            <input type="text" id="password2" v-model="password2"><br>

            <input type="submit" value="SignUp">

        </form>


    </div>
</template>

<script>
export default {
    name: 'SignUpView',
    data() {
        return {
            username: null,
            password1: null,
            password2: null,
        }
    }
}
</script>

<style>

</style>