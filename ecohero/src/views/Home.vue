<template>
    <Welcome/>
    <GetStarted/>
    <BottomBar/>
    
</template>

<script>
import Welcome from '@/components/Welcome.vue'
import GetStarted from '@/components/GetStarted.vue'
import BottomBar from '@/components/BottomBar.vue'

export default {
  name: 'Home',
  components: {
    Welcome,
    GetStarted,
    BottomBar
  }
}
</script>
