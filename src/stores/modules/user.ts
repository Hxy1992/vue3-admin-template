import { defineStore } from "pinia";

import piniaPersistConfig from "@/stores/helper/persist";
import { UserState } from "@/stores/interface";

export const useUserStore = defineStore({
  id: "hi-vue3-admin-user",
  state: (): UserState => ({
    token: "",
    userInfo: { name: "admin" }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("hi-vue3-admin-user")
});
