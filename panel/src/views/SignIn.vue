<template>
  <div class="flex items-center justify-center min-h-screen bg-[rgb(var(--bgcolor))]">
    <div class="w-full max-w-sm p-6 space-y-6">
      <!-- Placeholder Logo (Icon) -->
      <div class="flex justify-center mb-6">
        <img src="/icon.png" alt="Logo" class="w-60 h-40" />
      </div>

      <!-- "Please Sign In" Title -->
      <div class="text-center text-gray-700 text-2xl font-bold mb-4">
        Please sign in
      </div>

      <!-- Sign-In Form -->
      <form @submit.prevent="signIn" class="space-y-4">
        <div>
          <!-- Email -->
          <input id="email" v-model="email" type="email" required
            class="block w-full px-4 py-2 border border-gray-500 rounded-t-lg placeholder:text-gray-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[rgb(var(--accent))] text-gray-500"
            placeholder="Email address" />

          <!-- Password -->
          <input id="password" v-model="password" type="password" required
            class="block w-full px-4 py-2 border border-t-0 border-gray-500 rounded-b-lg placeholder:text-gray-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[rgb(var(--accent))] text-gray-500"
            placeholder="Password" />
        </div>

        <div>
          <button type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
            Sign In
          </button>
        </div>

        <div v-if="error" class="text-red-500 text-sm mt-2 text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');
const error = ref<string | null>(null);

const signIn = async (): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/'); // Redirect to home page after successful login
  } catch (err: any) {
    //console.error('Login error: ', err);
    if (err.message === 'Firebase: Error (auth/invalid-credential).') {
      error.value = 'Invalid email or password. Please try again.';
    } else {
      error.value = err.message;
    }
  }
};
</script>
