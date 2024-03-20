<template>

    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
            </path>
        </svg>
    </button>

    <div class="flex ">
        <Transition>
            <aside id="default-sidebar" class="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                v-show="showSideBar" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li v-for="(item, index) in sideBarItems" :key="index">
                            <RouterLink :to="$router.resolve({ name: item.routeName }).path"
                                :class="routeName.matched.some(data => data.name == item.routeName) || routeName.name == item.routeName ? 'bg-gray-600 text-white' : 'text-black'"
                                class="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white group">

                                <component :is="item.iconComponent"
                                    class="flex-shrink-0 w-6 h-6 mr-3 group-hover:text-white"
                                    :class="($route.matched.some(data => data.name == item.routeName) || $route.name == item.routeName) && (!item.hasOwnProperty('children')) ? 'text-white' : 'text-black'">
                                </component>
                                {{ item.name }}
                            </RouterLink>
                        </li>

                    </ul>
                </div>
            </aside>
        </Transition>
        <nav class="w-full border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-wrap items-center justify-between w-full p-4 pr-5">
                <button data-collapse-toggle="navbar-hamburger" type="button" @click="showSideBar = !showSideBar"
                    class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-hamburger" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div class="flex ml-auto">
                    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img class="w-10 h-10 rounded-full"
                            src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png"
                            alt="Rounded avatar">
                        <span
                            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                </div>

            </div>
            <main class="flex-1 bg-gray-200">
                    <RouterView :key="$route.path" />
                </main>
        </nav>


    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { PlusIcon, StarIcon } from "@heroicons/vue/24/outline";
let showSideBar = ref(true);
let routeName = useRouter().currentRoute;
let sideBarItems = [
    {
        name: 'Product',
        routeName: 'Product',
        iconComponent: StarIcon
    },
    {
        name: 'Create Product',
        routeName: 'ProductCreate',
        iconComponent: PlusIcon
    }
];

</script>

<style scoped></style>
