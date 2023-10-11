<script setup>
import { auth } from '@/plugins/store/modules/auth';
import { logOut } from '@/api/services/auth';
const authModule = auth();

async function logout() {
    let res = await logOut()
    if (res.data.success) {
        authModule.clearLoggedIn()
    }
}
</script>

<template>
    <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid text-light row">
            <div class="logo col-2">
                <h3>Logo</h3>
                <div class="location"></div>
            </div>
            <div class="search d-flex col-6">
                <div class="input-group">
                    <button class="btn btn-outline-secondary dropdown-toggle bg-light text-dark" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">All</button>
                    <ul class="dropdown-menu bg-light">
                        <li><a class="dropdown-item text-dark" href="#">Action</a></li>
                        <li><a class="dropdown-item text-dark" href="#">Another action</a></li>
                        <li><a class="dropdown-item text-dark" href="#">Something else here</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                    <input type="text" class="form-control bg-light" aria-label="Text input with dropdown button"
                        aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary bg-warning" type="button" id="button-addon2"><img
                            src="@assets/search.svg" /></button>
                </div>
            </div>
            <div class="col-4">
                <div class="row d-flex align-items-center">
                    <div class="col col-md-3 locale ">
                        lang
                    </div>
                    <div class="col col-md-3 acounts dropdown">
                        <span class=" dropdown-toggle cursor" data-bs-toggle="dropdown" aria-expanded="false">Account</span>
                        <ul class="dropdown-menu bg-light">
                            <li class="dropdown-item text-dark" v-if="!authModule.isLoggedIn">
                                <div>
                                    <router-link :to="{ name: 'login' }"
                                        class="btn btn-warning w-75 d-flex mx-auto justify-content-center">Sign
                                        In</router-link>
                                    <p class="text-sm mt-2 text-center">Not A Customer <router-link to="#"
                                            class="text-primary text-decoration-none">Start
                                            here</router-link></p>
                                </div>
                            </li>
                            <template v-else>
                                <li class="dropdown-item text-dark"><a class="dropdown-item text-dark" href="#">Account
                                    </a></li>
                                <li class="dropdown-item text-dark"><a class="dropdown-item text-dark" href="#">Orders
                                    </a></li>
                                <li class="dropdown-item text-dark" @click="logout"> <span
                                        class="dropdown-item text-dark cursor">Logout</span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="col col-md-3 orders ">
                        Orders
                    </div>
                    <div class="col col-md-3  cart d-flex align-items-center">
                        <div class="position-relative">
                            <img src="@assets/cart.svg" class="pt-1" />
                            <span class="position-absolute top-0 start-50 translate-middle text-warning">
                                0
                            </span>
                        </div>
                        <span class="ms-1">Cart</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>