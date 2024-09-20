

<script setup>
import Pagination from "@/Components/pagination.vue";
import MagnifyingGlass from "@/Icons/MagnifyingGlass.vue";
import { Head, usePage, Link, useForm, router } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, computed, watch} from "vue";
import DashboardLayout from "@/Pages/DashboardLayout.vue";
import InputError from "@/Components/InputError.vue";


defineProps({
    classes: Array,
    students:Array,
});



const form = useForm({
  name: "",
  email: "",
  class_id: "",
  section_id: "",
});

const deleteForm = useForm({});
const createStudent = ref(false);
let search = ref(usePage().props.search),
  pageNumber = ref(1);

let studentsUrl = computed(() => {
  let url = new URL(route("students.index"));
  url.searchParams.append("page", pageNumber.value); // Use `.value` for reactive `ref`

  if (search.value) {
    url.searchParams.append("search", search.value); // Append search param if it exists
  }

  return url; // Return the URL
});

watch(
  () => studentsUrl.value,
  (updatedStudentsUrl) => {
    router.visit(updatedStudentsUrl, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
    });
  }
);

const deleteStudent = (studentid) => {
  if (confirms("Are you sure you want to delete this student?")) {
    deleteForm.delete(route("students.destroy", studentid));
  }
};

</script>
<template>
  <!-- {{ search }} -->
  <Head title="Create Student" />
  <DashboardLayout>

    <!-- Create Student Module -->
    <v-dialog max-width="500" v-model="createStudent">
      <v-card title="Student Data">
        <v-card-text>
          <form @submit.prevent="createStudent">
            <v-container>
              <v-form>
                <!-- Name Input -->
                <v-text-field
                  v-model="name"
                  label="Name"
                  outlined
                  required
                ></v-text-field>

                <!-- Email Input -->
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  required
                ></v-text-field>

                <!-- Class Select -->
                <v-select
                  v-model="selectedClass"
                  :items="classes"
                  label="Class"
                  outlined
                  required
                ></v-select>

                <!-- Section Select -->
                <v-select
                  v-model="selectedSection"
                  :items="sections"
                  label="Section"
                  outlined
                  required
                ></v-select>
                <v-row class="mt-4" justify="end">
                  <v-spacer></v-spacer>
                  <!-- This pushes buttons to the right -->
                  <v-btn color="secondary" class="ml-2" @click="cancelForm"
                    >Cancel</v-btn
                  >
                  <v-btn color="primary" class="ml-2" @click="submitForm"
                    >Save</v-btn
                  >
                </v-row>
              </v-form>
            </v-container>
          </form>
        </v-card-text>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>

    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Create Student
      </h2>
    </template>

     <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Students</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the Students.</p>
        </div>

        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

          <v-btn v-btn color="primary" class="ml-2" 
          @click="createStudent = true">Add Student</v-btn>
        </div>
      </div>

      <div class="flex flex-col justify-between sm:flex-row mt-6">
        <div class="relative text-sm text-gray-800 col-span-3">
          <div
            class="absolute pl-2 left-0 top-0 bottom-0 flex items-center pointer-events-none text-gray-500"
          >
            <MagnifyingGlass />
          </div>

          <input
            v-model="search"
            type="text"
            autocomplete="off"
            placeholder="Search students data..."
            id="search"
            class="block rounded-lg border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg relative"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Section
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6" />
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="student in students.data" :key="student.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      {{ student.id }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      {{ student.name }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ student.email }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ student.class.name }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ student.section.name }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ student.created_at }}
                    </td>

                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    >
                      <Link
                        :href="route('students.edit', student.id)"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        @click="deleteStudent(student.id)"
                        class="ml-2 text-indigo-600 hover:text-indigo-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination :data="students" />
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>