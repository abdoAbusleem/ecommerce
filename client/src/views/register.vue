<script setup>
import { ref, computed } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { register } from '@/api/services/auth';
let user = ref({
    name: '',
    password: '',
    confirm_password: '',
    email: '',
})

const rules = computed(() => {
    return {
        name: { required },
        password: { required, minLength: minLength(6) },
        confirm_password: {
            required, minLength: minLength(6), sameAs: sameAs(user.value.password)
        },
        email: { required, email },
    }
})

const $v = useVuelidate(rules, user.value)

async function registerUser() {
    await $v.value.$validate();
    if ($v.value.$invalid) return;

    let res = await register(user.value)
    console.log(res)
}

</script>

<template>
    <section class="login">
        <div class="container">
            <form class="w-50 mx-auto shadow-sm p-3 mt-5">
                <div class="mb-3 row">
                    <label for="username" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="user.name" class="form-control" id="username"
                            :class="{ 'border-danger': $v.name.$error }">
                        <template v-if="$v.name.$error">
                            <span v-if="$v.name.required.$invalid" class="text-danger">Username is required</span>
                        </template>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" v-model="user.email" class="form-control" id="staticEmail"
                            :class="{ 'border-danger': $v.email.$error }">
                        <template v-if="$v.email.$error">
                            <span v-if="$v.email.required.$invalid" class="text-danger">E-mail is required</span>
                            <span v-if="$v.email.email.$invalid" class="text-danger">Enter a valid email</span>
                        </template>
                    </div>

                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" v-model="user.password" class="form-control" id="inputPassword"
                            :class="{ 'border-danger': $v.password.$error }">
                        <template v-if="$v.password.$error">
                            <span v-if="$v.password.required.$invalid" class="text-danger">Password is required</span>
                            <span v-if="$v.password.minLength.$invalid" class="text-danger">Password min length 6
                                char</span>
                        </template>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputConfirmPassword" class="col-sm-2 col-form-label">Confirm Password</label>
                    <div class="col-sm-10">
                        <input type="password" v-model="user.confirm_password" class="form-control"
                            id="inputConfirmPassword" :class="{ 'border-danger': $v.confirm_password.$error }">
                        <template v-if="$v.confirm_password.$error">
                            <ul class="text-danger list-unstyled">
                                <li v-if="$v.confirm_password.required.$invalid" class="text-red-500">confirm password is
                                    required</li>
                                <li v-if="$v.confirm_password.minLength.$invalid" class="text-red-500">Password must be at
                                    least 6 char</li>
                                <li v-if="$v.confirm_password.sameAs.$invalid" class="text-red-500">confirm password must be
                                    same as password</li>

                            </ul>
                        </template>
                    </div>
                </div>
                <button class="btn btn-primary d-flex mx-auto mt-3" @click.prevent="registerUser">Register</button>
            </form>
        </div>
    </section>
</template>