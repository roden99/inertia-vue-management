import './bootstrap';
import '../css/app.css';
import "@mdi/font/css/materialdesignicons.css";
// import '@sweetalert2/theme-material-ui/material-ui.scss';
// import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import vuetify from './vuetify'; // Import vuetify.js
// import { createPinia } from 'pinia'; // Import Pinia
import 'vuetify/styles'; // Import Vuetify styles
// import pdfMake from 'pdfmake/build/pdfmake'; // Corrected import statement for pdfMake
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import printJS from 'print-js';
// import { PDFPlugin } from 'vue3-pdfmake';
// import { usePDF } from 'vue3-pdfmake';
// import moment from 'moment'
// import numeral from 'numeral';
import axios from 'axios';
const appName = import.meta.env.VITE_APP_NAME || 'Animal Genetics Resource Information System';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.axios = axios
// window.swal = Swal
// window.moment = moment
// window.numeral = numeral
// window.usePDF = usePDF
// window.getImage = function(url) {
//     return new Promise((resolve, reject) => {
//       var img = new Image();
//       img.setAttribute("crossOrigin", "anonymous");

//       img.onload = () => {
//         var canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;

//         var ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);

//         var dataURL = canvas.toDataURL("image/png");

//         resolve(dataURL);
//       };

//       img.onerror = error => {
//         reject(error);
//       };

//       img.src = '../../assets/images/' + url;
//     });
//   }
// window.pdfmake = pdfmake;
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        // const pinia = createPinia(); // Create a Pinia instance
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(vuetify)
            // .use(pinia)
            // .use(PDFPlugin)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});