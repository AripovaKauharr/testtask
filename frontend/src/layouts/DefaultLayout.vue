<template>
  <div class="layout">
    <header>
      <h1>Аналитика звонков колл-центра "O!"</h1>
    </header>
    <div class="working-window">
    <div class="sidebar">
      <h3>Меню</h3>
      <div 
        class="sidebar-item"
        v-for="(item, index) in sidebarItems" 
        :key="item.id"
        :class="{ active: isActive(index) }"
      >
      <router-link :to="item.link">
        <p>{{ item.name }}</p>
      </router-link>
      </div>
    </div>
    <main>
      <router-view />
    </main>
  </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout',
  data() {
    return {
      sidebarItems: [
        {id: 1, name: 'Дашборд', link: '/dashboard' },
        {id: 2, name: 'Детализация', link: '/details' },
        {id: 3, name: 'Пользователи', link: '/users' },
      ]
    }
  },
  methods: {
    isActive(index: number) {
      return this.$route.path === this.sidebarItems[index].link;
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}
header {
  background-color: var(--main-color);
  color: white;
  padding: 20px
}
.working-window {
  flex: 1;
  display: flex;
}
main {
  flex: 1;
  background-color: var(--body-bg);
  padding: 18px;
}
.sidebar {
  min-width: 200px;
  max-width: 300px;
  width: 20%;
  h3 {
    margin: 20px;
  }
}
.sidebar-item {
  transition: 0.2s;
  p{
    padding: 15px 20px;
  }
  &:hover {
    background-color: var(--main-color-300);
    a {
      color: white
    }
  }
  &:active {
    background-color: var(--main-color-700);
  }
  a {
    color: black;
    text-decoration: none;
  }
}
.sidebar-item.active {
    background-color: var(--main-color-700);
    a {
    color: white;
  }

}
</style>
