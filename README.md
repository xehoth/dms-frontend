# ocf-web

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 部署

### 环境变量

修改 `.env` 文件中的环境变量

`VUE_APP_API_URL` 为 `axios` 请求地址，默认为 `/api`，正式部署时需要将 `/api` 的请求反代至 `ocf-backend` 环境变量中的 `SERVER_PORT`

### 正式部署

确保已安装 `nodejs` 并已安装 `yarn`

``` bash
cd ocf-web
yarn
yarn build
```

将 `dist/` 目录下文件部署即可
