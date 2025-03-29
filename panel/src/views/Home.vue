<template>
  <div class="min-h-screen relative bg-[rgb(var(--bgcolor))] text-white">
    <!-- Placeholder for Logo Icon on the top left -->
    <div class="absolute top-4 left-4">
      <img src="/icon.png" alt="Logo" class="w-15 h-10" />
    </div>


    <!-- User Icon with Email Displayed -->
    <div class="absolute top-4 right-4 flex items-center">
      <!-- User Email (displayed to the left of the user icon) -->
      <span class="text-white text-sm">{{ userEmail }}</span>

      <!-- User icon -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-8 h-8 mx-4">
        <path fill="#ffffff"
          d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
      </svg>

      <!-- Dropdown icon that triggers the dropdown next to user icon -->
      <button @click="toggleDropdown" class="flex items-center space-x-2 rounded-full hover:bg-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 h-8">
          <path fill="#ffffff" d="M12 15l-4-4h8z" />
        </svg>
      </button>

      <!-- Logout Dropdown menu -->
      <div v-if="showDropdown"
        class="absolute right-0 mt-2 w-48 shadow-lg rounded-lg z-10 bg-[rgb(var(--bgcolor))] border border-gray-600"
        style="top: 100%;">
        <button @click="logOut" class="w-full text-left px-4 py-2 text-white hover:bg-[rgb(var(--bghover))]">Log
          Out</button>
      </div>
    </div>

    <!-- Main Content -->
    <main class="p-6 pt-20">
      <div class="overflow-hidden">
        <!-- Table for larger screens -->
        <div class="hidden md:block">
          <table class="min-w-full">
            <thead class="text-gray-600 text-2xl">
              <tr>
                <th class="px-4 py-2">Parameter Key</th>
                <th class="px-4 py-2">Value</th>
                <th class="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in configData" :key="index">
                <td class="px-4 py-2">{{ item.parameter_key }}</td>
                <td class="px-4 py-2" v-if="!item.isEditing">{{ item.value }}</td>
                <td v-if="item.isEditing" class="px-4 py-2">
                  <input v-model="item.value" class="w-full px-4 py-2 rounded-md border box-border" />
                </td>
                <td class="px-4 py-2 flex justify-center space-x-2">
                  <div v-if="!item.isEditing">
                    <button @click="editParameter(item)"
                      class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 mr-2">Edit</button>
                    <button @click="deleteConfig(item.parameter_key)"
                      class="bg-red-600 text-white p-2 rounded-md hover:bg-red-700">Delete</button>
                  </div>
                  <div v-if="item.isEditing">
                    <button @click="saveParameter(item)"
                      class="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 mr-2">Save</button>
                    <button @click="cancelEdit(item)"
                      class="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700">Cancel</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-4 py-2">
                  <input v-model="newConfig.parameter_key" type="text" placeholder="Parameter Key"
                    class="w-full p-2 border border-gray-600 rounded-md" />
                </td>
                <td class="px-4 py-2">
                  <input v-model="newConfig.value" type="text" placeholder="Value"
                    class="w-full p-2 border border-gray-600 rounded-md" />
                </td>
                <td class="px-4 py-2">
                  <button @click="addConfig"
                    class="text-white p-2 rounded-md hover:bg-green-500 bg-green-400">Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile View for Editable Fields -->
        <div class="md:hidden">
          <div v-for="(item, index) in configData" :key="index"
            class="mb-4 p-4 border border-gray-600 rounded-lg shadow-md">
            <div class="flex flex-col">
              <h3>Parameter Key: {{ item.parameter_key }}</h3>
              <div v-if="!item.isEditing">
                <p>Value: {{ item.value }}</p>
              </div>
              <div v-if="item.isEditing" class="mt-4">
                <input v-model="item.value" class="w-full p-2 border border-gray-600 rounded-md mb-2" />
              </div>
              <div class="mt-4 flex space-x-2">
                <button v-if="!item.isEditing" @click="editParameter(item)"
                  class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 w-full">Edit</button>
                <button v-if="item.isEditing" @click="saveParameter(item)"
                  class="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 w-full">Save</button>
                <button v-if="item.isEditing" @click="cancelEdit(item)"
                  class="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 w-full">Cancel</button>
                <button v-if="!item.isEditing" @click="deleteConfig(item.parameter_key)"
                  class="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 w-full">Delete</button>
              </div>
            </div>
          </div>

          <!-- Mobile Form to Add New Parameter -->
          <div class="p-4 mb-4 border border-gray-600 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Add New Parameter</h3>
            <div class="flex flex-col space-y-2">
              <input v-model="newConfig.parameter_key" type="text" placeholder="Parameter Key"
                class="p-2 border border-gray-600 rounded-md" />
              <input v-model="newConfig.value" type="text" placeholder="Value"
                class="p-2 border border-gray-600 rounded-md" />
              <button @click="addConfig" class="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                Add Parameter
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase/firebase';
import axios from 'axios';

// Placeholder User Information
const showDropdown = ref(false);
const router = useRouter();
const configData = ref<{ parameter_key: string; value: any; isEditing: boolean }[]>([]);
const newConfig = ref({
  parameter_key: '',
  value: '',
});
const userEmail = ref<string | null>(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const fetchConfigData = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
    });
    //console.log('Fetch config data response: ', response);

    if (response.data.success == false) {
      alert(`Error: ${response.data.message}`);
      return;
    }

    const data = response.data.data;
    if (!data || Object.keys(data).length === 0) {
      alert('No configuration data found.');
      return;
    }

    configData.value = Object.keys(data).map((key) => ({
      parameter_key: key,
      value: data[key],
      isEditing: false,
    }));
  } catch (error) {
    //console.error('Error fetching config data:', error);
    alert('An error occurred while fetching the config data');
  }
};

// Add new parameter
const addConfig = async () => {
  if (newConfig.value.parameter_key && newConfig.value.value) {
    try {
      const firebaseId = await auth.currentUser?.getIdToken(true);

      // Check if the key already exists in configData
      const existingIndex = configData.value.findIndex((item) => item.parameter_key === newConfig.value.parameter_key);

      if (existingIndex === -1) {
        // Key doesn't exist, add it as a new entry
        const response = await axios.patch(API_BASE_URL,
          {
            [newConfig.value.parameter_key]: newConfig.value.value,
          },
          {
            headers: {
              'Authorization': `Bearer ${firebaseId}`,
            },
          }
        );

        if (response.data.success == false) {
          alert(`Error: ${response.data.message}`);
          return;
        }

        // Add the new key-value pair to configData
        configData.value.push({
          parameter_key: newConfig.value.parameter_key,
          value: newConfig.value.value,
          isEditing: false,
        });
        alert('New parameter added successfully');
      } else {
        // Key exists, tell user to edit it instead
        alert(`Key "${newConfig.value.parameter_key}" already exists. Please edit it instead.`);
        return; 
      }

      // Reset the form
      newConfig.value = { parameter_key: '', value: '' };
    } catch (error) {
      alert('An error occurred while adding the new config');
    }
  } else {
    alert('Please enter a value');
  }
};

const deleteConfig = async (key: string) => {
  try {
    const firebaseId = await auth.currentUser?.getIdToken(true);
    const response = await axios.delete(`${API_BASE_URL}/${key}`, {
      headers: {
        Authorization: `Bearer ${firebaseId}`,
      },
    });
    //console.log('Delete config response:', response);

    if (response.data.success == false) {
      alert(`Error: ${response.data.message}`);
      return;
    }

    configData.value = configData.value.filter((item) => item.parameter_key !== key);
    alert('Parameter key deleted successfully');
  } catch (error) {
    //console.error('Error deleting parameter key:', error);
    alert('An error occurred while deleting the parameter key');
  }
};

// Edit a parameter
const editParameter = (parameter: any) => {
  parameter.originalValue = parameter.value;
  parameter.isEditing = true;
};

// Cancel editing
const cancelEdit = (parameter: any) => {
  parameter.value = parameter.originalValue; // Restore the original value if needed
  parameter.isEditing = false;
};

// Save the parameter after editing
const saveParameter = async (parameter: any) => {
  if (parameter.value !== parameter.originalValue) {
    editConfig(parameter);  
  } else {
    alert('No changes detected.');
  }
};

const editConfig = async (parameter: any) => {
  if (parameter.parameter_key && parameter.value) {
    // Check if the value is actually different from the original value
    if (parameter.value === parameter.originalValue) {
      alert('No changes detected.');
      return;
    }

    try {
      const firebaseId = await auth.currentUser?.getIdToken(true);
      const response = await axios.patch(API_BASE_URL,
        {
          [parameter.parameter_key]: parameter.value,
        },
        {
          headers: {
            'Authorization': `Bearer ${firebaseId}`,
          },
        }
      );

      // If backend returns a failure
      if (response.data.success == false) {
        alert(`Error: ${response.data.message}`);
        return;
      }

      // Update the existing value in frontend data
      const existingIndex = configData.value.findIndex((item) => item.parameter_key === parameter.parameter_key);
      if (existingIndex !== -1) {
        configData.value[existingIndex].value = parameter.value;
        configData.value[existingIndex].isEditing = false;
      }

      alert('Parameter value changed successfully');
    } catch (error) {
      alert('An error occurred while changing the parameter value');
    }
  } else {
    alert('Please enter a value');
  }
};

// Toggle dropdown menu
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Log out function 
const logOut = async () => {
  try {
    await auth.signOut();
    router.push('/signin');
  } catch (error) {
    //console.error('Error during logout: ', error);
    alert('An error occurred during logout');
  }
};

onMounted(async () => {
  fetchConfigData();
  const user = auth.currentUser;
  if (user) {
    userEmail.value = user.email;
  }
});
</script>
