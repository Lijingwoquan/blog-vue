import { ref } from 'vue';

export function ModChange() {
    const mod = ref("day")
    const bgColor = ref('')
    const textColor = ref('')
    function changeReadindMod() {
        mod.value = mod.value == "day" ? "night" : "day"
        bgColor.value = mod.value == "day" ? "" : "black"
        textColor.value = mod.value == "day" ? "" : "#fff"

        document.body.style.backgroundColor = mod.value == 'day' ? "" : "black"
        document.body.style.color = mod.value == 'day' ? "" : "#fff"
        
    }
    return {
        mod,
        bgColor,
        textColor,
        changeReadindMod,
    }
}
// export function search(){
//     const dialogVisible = ref(false);

// }