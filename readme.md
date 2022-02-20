# splatoon2-schedules-weapp

为Splatoon2玩家提供地图时刻表、打工安排、商店展示等信息查询的小程序。

小程序码：

![](https://s1.ax1x.com/2018/07/09/PmRHtU.jpg)

## 开发说明

新版本数据服务由微信云开发提供

1. 配置微信云开发：`src/config/wxcloud.sample.js`，复制一份并将sample去掉，即保存为`wxcloud.js`

---

此项目基于wepy开发，数据服务由LeanCloud提供

1. 配置LeanCloud：`src/config/leancloud.sample.js`，复制一份并将sample去掉，即保存为`leancloud.js`
2. 使用微信开发者工具导入时，直接将项目目录导入即可，开发者工具将自动获取dist文件夹内的文件。

```bash
# 使用npm安装依赖，因为用yarn安装时wepy好像有些问题
npm install

# 开发
npm run dev

# 打包
# 新项目直接打包可能会报错，可以先执行dev，之后再build
npm run build
```

# 数据来源 (Data Source)

小程序所有数据（日程、打工、祭典、商店等）均来自[Splatoon2.ink](https://splatoon2.ink/)。
