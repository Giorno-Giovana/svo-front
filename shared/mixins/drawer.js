const drawer = {
  data() {
    return {
      isDrawerVisible: false,
    }
  },
  methods: {
    closeDrawer() {
      this.isDrawerVisible = false
    },
    openDrawer() {
      this.isDrawerVisible = true
    },
    toggleDrawer() {
      this.isDrawerVisible = !this.isDrawerVisible
    },
  },
}
export default drawer
