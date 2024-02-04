<template>
    
    <div v-html="htmlDemo" class="eassy"></div>
</template>

<script setup>
const htmlDemo = `
    <h2>Go 语言简介</h2>
    <p>Go（又称 Golang）是一门由 Google 开发的开源编程语言，于 2009 年首次亮相。它的设计注重简洁、高效和易读性。</p>
    <h2>特点：</h2>
    <ul>
        <li><strong>并发支持：</strong> Go 具有内建的并发支持，轻松处理并发任务。</li>
        <li><strong>简单易学：</strong> 语法简洁，学习曲线平缓，适合新手入门。</li>
        <li><strong>性能优越：</strong> Go 编译为本地代码，具有出色的性能。</li>
        <li><strong>垃圾回收：</strong> 具有自动垃圾回收机制，减轻了内存管理的负担。</li>
        <li><strong>开发效率：</strong> 内置了强大的标准库，提供了丰富的工具和框架。</li>
    </ul>
    <h2>使用场景：</h2>
    <p>Go 语言广泛应用于网络编程、分布式系统、云计算、容器技术（如 Docker、Kubernetes）等领域。</p>
    <h2>示例代码：</h2>
    <pre>
        <code>
package main
import "fmt"
func main() {
    fmt.Println("Hello, Go!")
}
        </code>
    </pre>
    <p>以上是一个简单的 "Hello, Go!" 的示例程序。</p>
    <p>欢迎开始学习 Go 语言的旅程！</p>`;
</script>

