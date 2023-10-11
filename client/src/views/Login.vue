<script setup>
import { ref, computed } from 'vue'
import { login } from '../api/services/auth';
import { auth } from '../plugins/store/modules/auth'
import { useRouter } from 'vue-router';
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

let authModule = auth()
const router = useRouter()

let user = ref(
    {
        email: '',
        password: '',
    }
)
const rules = computed(() => {
    return {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        }
    };
});
const $v = useVuelidate(rules, user.value);

async function loginUser() {
    await $v.value.$validate();
    if ($v.value.$invalid) return;

    let res = await login(user.value)
    if (res.status == 200) {
        authModule.setLoggedIn(true)
        router.push({ name: 'home' })
    }
}
</script>

<template>
    <section class="login">
        <div class="container">
            <form class="w-50 mx-auto shadow-sm p-3 mt-5">
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" v-model="user.email" :class="{ 'border-danger': $v.email.$error }"
                            class="form-control" id="staticEmail">
                        <template v-if="$v.email.$error">
                            <span v-if="$v.email.required.$invalid" class="text-danger">E-mail is required</span>
                            <span v-if="$v.email.email.$invalid" class="text-danger">Enter a valid email</span>
                        </template>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" v-model="user.password" :class="{ 'border-danger': $v.password.$error }"
                            class="form-control" id="inputPassword">
                        <template v-if="$v.password.$error">
                            <span v-if="$v.password.required.$invalid" class="text-danger">Password is required</span>
                            <span v-if="$v.password.minLength.$invalid" class="text-danger">Password must be at least 6
                                char</span>
                        </template>
                    </div>

                </div>
                <button class="btn btn-primary d-flex mx-auto mt-3" @click.prevent="loginUser">Login</button>
            </form>
        </div>
    </section>
</template>