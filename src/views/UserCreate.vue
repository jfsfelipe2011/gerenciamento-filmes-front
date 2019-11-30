<template>
  <UserCreate></UserCreate>
</template>

<script>
  // @ is an alias to /src
  import UserCreate from '@/components/UserCreate.vue'

  export default {
    name: 'user-create',
    components: {
      UserCreate
    }
  }
</script>
