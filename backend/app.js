// 导入express
const express = require('express')

// 创建服务器实例
const app = express()

// 导入joi
const joi = require('joi')

// 跨域问题解决
const cors = require('cors')
app.use(cors())

// 解析 JSON 格式的请求体
app.use(express.json());

// 配置解析表单数据的中间件，格式：application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 封装res.cc来统一处理请求错误信息和状态
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'], }).unless({ path: [/^\/api\//] }))  

// 导入路由模块
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const adminLogin = require('./router/adminServer/login')
const adminArticle = require('./router/adminServer/atricle')
const adminCategory = require('./router/adminServer/category')
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/api/admin', adminLogin)
app.use(adminArticle)
app.use(adminCategory)

// 定义错误级别中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)  // 表单校验失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')  // 身份认证失败后的错误
    res.cc(err)
})

// 指定端口号并启动服务器
app.listen(3007, () => {        
    console.log('服务器已启动，端口号为3007')
})