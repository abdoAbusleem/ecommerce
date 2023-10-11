<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { fetchAllPosts } from '@/api/services/products/index';

const router = useRouter()

let products = ref([])

onMounted(() => {
    getAllPosts()
})
function goToDetails(id) {
    return router.push({
        name: 'product-details', params: {
            id: id
        }
    })
}

async function getAllPosts() {
    let res = await fetchAllPosts({
        pageNumber: 1,
        pageSize: 10
    })
    products.value = res.data.products
}

</script>

<template>
    <div class="container">
        <div class="row pt-2">
            <div class="col-12 col-sm-6 col-md-4" v-for="item in products">
                <div class="card mb-3" @click="goToDetails(item.id)">
                    <div class="">
                        <div class="">
                            <img :src="item.image?.[0]" class="img-fluid h-100 rounded-top cursor" alt="...">
                        </div>
                        <div class="">
                            <div class="card-body">
                                <h5 class="card-title cursor" @click="goToDetails">{{ item.productName }}</h5>
                                <p class="card-text">{{ item.description }}</p>
                                <p class="card-text"><small class="text-body-secondary">{{ item.price }} EGP</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
