import { ElNotification } from "element-plus";
import { ElLoading } from 'element-plus'


import nprogress from "nprogress"
//成功提示
export function toast(message, type = "success") {
    ElNotification({
        message: message,
        type: type,
        duration: 1500
    })
}

export async function showLoading(text = "正在加载中...", data) {
    const loading = ElLoading.service({
        lock: true,
        text: text,
        background: 'rgba(0, 0, 0, 0.7)',
    })
    await new Promise(resolve => setTimeout(resolve, 300)); // 等待1毫秒
    loading.close()
    return true
}


//显示全局loading
export function showFullLoading() {
    nprogress.start();
}

//隐藏全局loading
export function hideFullLoading() {
    nprogress.done()
}