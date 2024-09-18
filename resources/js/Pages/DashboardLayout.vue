<template>
    <v-app>
        <v-app-bar color="orange" prominent app>
            <v-app-bar-nav-icon @click="drawer = !drawer" />


            <v-toolbar-title>{{ appName }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu color="">
                <template v-slot:activator="{ props }">{{ $page.props.auth.user.name }}
                    <v-btn v-bind="props" icon="mdi-account"> </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="$inertia.visit('/profile')" link>
                        <v-icon left>mdi-account</v-icon>
                        <!-- Optional: Add an icon -->
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout" link>
                        <v-icon left>mdi-logout</v-icon>
                        <!-- Optional: Add an icon -->
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app class="bg-black" theme="dark">
            <!-- Add navigation links here -->
            <v-list>
                <v-list-item :class="{
                    'hover-list-item': true,
                    'selected-list-item': isCurrentRoute('/dashboard'),
                }" prepend-icon="mdi-home" link @click="$inertia.visit('/dashboard')">
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item :class="{
                    'hover-list-item': true,
                    'selected-list-item': isCurrentRoute('/students'),
                }" prepend-icon="mdi-file-document" link @click="$inertia.visit('/students')">
                    <v-list-item-title>Students</v-list-item-title>
                </v-list-item>
                <v-list-item :class="{
                    'hover-list-item': true,
                    'selected-list-item': isCurrentRoute('/unscanned'),
                }" prepend-icon="mdi-scanner-off" link @click="$inertia.visit('/unscanned')">
                    <v-list-item-title>Suppliers</v-list-item-title>
                </v-list-item>
                <v-list-item :class="{
                    'hover-list-item': true,
                    'selected-list-item': isCurrentRoute('/users'),
                }" prepend-icon="mdi-account-key" link @click="$inertia.visit('/users')">
                    <v-list-item-title>Products</v-list-item-title>
                </v-list-item>
                <v-list-item :class="{
                    'hover-list-item': true,
                    'selected-list-item': isCurrentRoute('/employees'),
                }" prepend-icon="mdi-account-tie" link @click="$inertia.visit('/employees')">
                    <v-list-item-title>Users</v-list-item-title>
                </v-list-item>
                <v-list-item class="list-item logout-item" prepend-icon="mdi-logout" link @click="logout">
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
                <!-- mdi-database-arrow-right -->
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container>
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import DropdownLink from "@/Components/DropdownLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { usePage } from "@inertiajs/vue3";

import { ref, onMounted } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";
// import { useUserStore } from "@/stores/user";
const page = usePage();
defineProps({
    title: String,
});
const isCurrentRoute = (route) => {
    return page.url === route;
};
const drawer = ref(true);
const appName = import.meta.env.VITE_APP_NAME;
// const userStore = useUserStore();
onMounted(async () => {
    const apiToken = localStorage.getItem("api_token");
    window.axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${apiToken}`;
});
const logout = () => {
    localStorage.removeItem("api_token");
    router.post(route("logout"));
};
</script>

<style scoped>
.hover-list-item {
    transition: background-color 0.3s ease, border-radius 0.3s ease, color 0.3s ease;
    border-radius: 8px;
    padding: 5px;
    color: inherit;
}

/* Hover effect for the list item */
.hover-list-item:hover {
    color: orange;
    border-radius: 8px !important;
}

/* Styles for the list item when selected */
.selected-list-item {
    background-color: rgb(255, 153, 0);
    color: rgb(0, 0, 0);
    border-radius: 8px !important;
}

/* Ensure selected items do not apply hover styles */
.selected-list-item:hover {
    background-color: rgb(255, 153, 0);
    color: white;
    border-radius: 8px !important;
}

.logout-item:hover {
    background-color: red;
    color: white;
}
</style>
