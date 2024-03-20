<template>
    <div>
        <section class="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div class="px-4 mx-auto lg:px-12">
                <!-- Start coding here -->
                <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div
                        class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                        <div class="w-full md:w-1/2">
                            <form class="flex items-center">
                                <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search"
                                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Search" required="">
                                </div>
                            </form>
                        </div>
                        <div
                            class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                            <button type="button"
                                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add product
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-4 py-3" v-for="(item, key) in headings" :key="key">{{
                                        item['label'] }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b dark:border-gray-700" v-for="(item, key) in items" :key="key">
                                    <!-- <th scope="row"
                                        class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/apple-iphone-14.png"
                                            alt="iMac Front Image" class="w-auto h-8 mr-3">
                                        Apple iPhone 14
                                    </th> -->
                                    <td class="px-4 py-3">{{ item['name'] }}</td>
                                    <td class="px-4 py-3">{{ item['category'] }}</td>
                                    <td class="px-4 py-3">{{ item['description'] }}</td>
                                    <td class="flex items-center justify-end px-4 py-3">
                                        <button type="button" @click="redirectToEdit(item.id)"
                                            class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            Edit</button>
                                        <!-- <button type="button"
                                            class="mt-5 text-white bg-rose-700 hover:bg-roses-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-rose-800">
                                            Delete</button> -->
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                        aria-label="Table navigation">
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Showing
                            <span class="font-semibold text-gray-900 dark:text-white">{{ data?.meta?.["from"] + "-"
                                        + data?.meta?.["to"] }}</span>
                            of
                            <span class="font-semibold text-gray-900 dark:text-white">{{ data?.meta?.["total"] }}</span>
                        </span>
                        <ul class="inline-flex items-stretch -space-x-px">
                            <li>
                                <a @click="page(x => x !== 1 ? x - 1 : 1)"
                                    class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Previous</span>
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a @click="page(x => x + 1)"
                                    class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Next</span>
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    </div>


</template>

<script setup>
import { onBeforeMount } from "@vue/runtime-core";
import { ref, watchEffect, computed, watch, } from 'vue';
import router from '../../../js/routes';
import axios from 'axios';

let data = ref([]);
let items = ref([]);
let pageValue = ref([]);

let baseUrl = ref("http://127.0.0.1:8000/api/products");
let url = ref("http://127.0.0.1:8000/api/products");

let loadData = () => {
    return new Promise((resolve, reject) => {
        data.value = {};
        items.value = [];
        axios
            .get(url.value)
            .then((response) => {
                items.value = response.data.data;
                data.value = response.data;
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

watch(pageValue, () => {
    url.value = baseUrl.value + "?page=" + pageValue.value
})

let page = (pageFunction) => {
    if (data.value.meta.current_page < data.value.meta.last_page) {
        pageValue.value = pageFunction(data.value.meta.current_page)
    }

};

let redirectToEdit = (id) => {
    router.push({ name: 'ProductEdit', params: { 'id':id } });
};

watch(url, () => {
    loadData();
})


onBeforeMount(() => {
    loadData();
})

let headings = [
    {
        'label': 'Name',
        'field': 'name',
        sortable: true
    },
    {
        'label': 'Category',
        'field': 'category',
        sortable: true
    },
    {
        'label': 'Description',
        'field': 'description',
        sortable: true
    },
    {
        'label': 'Action',
        'field': 'action',
        sortable: false
    }
]

</script>

<style scoped></style>
