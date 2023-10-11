<script setup>
import { fetchProductDetails } from '@/api/services/products/index'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

let product = ref({})
onMounted(() => {
    productDetails()
})

async function productDetails() {
    let res = await fetchProductDetails(route.params.id)
    product.value = res.data
}
</script>

<template>
    <div class=" pt-5">
        <div class="row">
            <div class="col col-md-5">
                <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active" v-for="img in product.image">
                            <img :src="img" class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="col col-md-4">
                <h3 class="text-dark text-break">{{ product.productName }}</h3>
                <span class="d-inline-block text-primary"> <router-link to="#">{{ product.brand }}</router-link></span>
                <hr />
                <p><span>EGP</span><span class="fw-bold">{{ product.price }} </span></p>
                <p class="text-secondary">Created at {{ product.createdAt }}</p>
                <p> {{ product.description }}</p>

            </div>
            <div class="col col-3">
                <div class="card border rounded p-2">
                    <p><span class="me-1">EGP</span><span class="fw-bold">{{ product.price }} </span></p>
                    <p class="text-capitalize text-success fw-medium">in stock</p>
                    <div class="w-25">
                        <select class="form-select" aria-label="Default select example">
                            <option v-for="n in product.stock" :key="n" :value="n">{{ n }}</option>
                        </select>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-warning text-capitalize w-100 rounded-pill">Add to cart</button>
                        <button class="btn btn-orange text-capitalize w-100 rounded-pill my-2">buy now</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
