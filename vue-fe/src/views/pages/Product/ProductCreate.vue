<template>
    <div>
        <section class="bg-white dark:bg-gray-900">
            <div class="px-4 py-8 mx-auto lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                <form @submit.prevent="save" enctype="multipart/form-data">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                                Name</label>
                            <input type="text" name="name" id="name" v-model="name" v-bind="nameAttrs"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name" required>
                            <div class="text-rose-400">{{ errors.name }}</div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="category"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                                Category</label>
                            <input type="text" name="name" id="name" v-model="category" v-bind="categoryAttrs"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product category" required>
                            <div class="text-rose-400">{{ errors.category }}</div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="8" v-model="description" v-bind="descriptionAttrs" required
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your description here"></textarea>
                            <div class="text-rose-400">{{ errors.description }}</div>
                        </div>
                    </div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="multiple_files">Upload multiple files</label>
                    <input @change="onFileChange"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="multiple_files" type="file" multiple>

                    <div>
                        <label for="Time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date
                            Time</label>
                        <input type="datetime-local" id="time" v-model="date" v-bind="dateAttrs"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <button type="submit"
                        class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add
                        product</button>
                </form>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from "@vue/runtime-core";
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import axios from 'axios';
import { useRoute } from "vue-router";
import router from '../../../js/routes';
const route = useRoute();
import * as yup from 'yup';

let baseUrl = ref("http://127.0.0.1:8000/api/products");
let images = ref([]);
let id = ref(0);

let props = defineProps({
    id: {
        type: Number,
    },
});


let onFileChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
        return;
    }
    createImage(files);
}
let createImage = (files) => {
    for (var index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            images.value.push(imageUrl);
        }
        reader.readAsDataURL(files[index]);
    }
}


const { errors, defineField } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            name: yup.string().required(),
            description: yup.string().required(),
            category: yup.string().required(),
            date: yup.date().required(),
        }),
    ),
});

const [name, nameAttrs] = defineField('name');
const [category, categoryAttrs] = defineField('category');
const [description, descriptionAttrs] = defineField('description');
const [date, dateAttrs] = defineField('date');


onMounted(() => {
    let id = route.params.id;
    if (id) {
        axios
            .get(baseUrl.value + "/" + id)
            .then((response) => {
                let data = response.data.data
                name.value = data.name;
                description.value = data.description;
                category.value = data.category;
                date.value = data.date
            })
            .catch((error) => {
                console.log(error);
            });
    }

})


let save = () => {
    let fields = {
        "id": id.value,
        "name": name.value,
        "description": description.value,
        "category": category.value,
        "date": date.value,
        "images": images.value
    };

    axios.post(baseUrl.value + "/save", fields)
        .then(response => {
            if (response.status == 200) {
                router.push({ name: "Product" });
            }
        })
        .catch(error => {
            alert("There was an error!");
            console.error("There was an error!", error);
        });


}
</script>
