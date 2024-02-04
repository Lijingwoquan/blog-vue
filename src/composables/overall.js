// ModChange.js
import { ref,watchEffect } from 'vue';
import { useStore } from 'vuex';

export function ModChange() {
  const store = useStore();

  const mod = ref(store.state.mod);
  const bgColor = ref(store.state.bgColor);
  const textColor = ref(store.state.textColor);

  function changeReadindMod() {
      store.commit('changeReadindMod');
    }
    
      // 使用 watch 监听 bgColor 和 textColor 的变化
      watchEffect(() => {
        bgColor.value = store.state.bgColor;
        textColor.value = store.state.textColor;
    });

  return {
    mod,
    bgColor,
    textColor,
    changeReadindMod,
  };
}
