<template>
  <v-container fluid id="diagrams">
    <database-diagram></database-diagram>
    <ux-diagram></ux-diagram>
  </v-container>
</template>
<script>

import DatabaseDiagram from '@/components/Diagrams/Database'
import UserExperienceDiagram from '@/components/Diagrams/UserExperience'
export default{
  components: {
    'database-diagram': DatabaseDiagram,
    'ux-diagram': UserExperienceDiagram,
  },
}


</script>