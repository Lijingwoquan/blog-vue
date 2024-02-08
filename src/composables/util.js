import { ElNotification } from "element-plus";
import nprogress from "nprogress"
//成功提示
export function toast(message, type = "success") {
    ElNotification({
        message: message,
        type: type,
        duration:1500
    })
}

//显示全局loading
export function showFullLoading() {
    nprogress.start();
}

//隐藏全局loading
export function hideFullLoading() {
    nprogress.done()
}