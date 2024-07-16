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

export async function showLoading(text = "正在加载中...") {
    const loading = ElLoading.service({
        lock: true,
        text: text,
        background: 'rgba(0, 0, 0, 0.7)',
    })
    await new Promise(resolve => setTimeout(resolve, 500));
    loading.close()
}

//显示全局loading
export function showFullLoading() {
    nprogress.start();
}

//隐藏全局loading
export function hideFullLoading() {
    nprogress.done()
}


export function listenWindowWidth() {
    let currentScreenWidth;

    // 获取初始屏幕宽度
    currentScreenWidth = window.innerWidth;

    // 监听窗口resize事件
    window.addEventListener('resize', () => {
        // 获取新的屏幕宽度
        const newScreenWidth = window.innerWidth;

        // 如果新旧宽度不同,执行相应操作
        if (newScreenWidth !== currentScreenWidth) {
            // 更新当前宽度
            currentScreenWidth = newScreenWidth;

            // 执行相应操作,如更新UI布局等
            updateLayout(newScreenWidth);
        }
    });
}
