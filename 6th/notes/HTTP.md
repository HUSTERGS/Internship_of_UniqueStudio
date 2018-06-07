# HTTP

## 基本概念/特点
* 基于TCP/IP 传递数据 分布式
* 只传输方法(GET、HEAD、POST、FETCH...)和路径(URL)
* 数据对象不设限
* 每次链接只处理一次请求 节省传输时间
* 无状态 如果后续需要处理前面的信息，必须重传 可能导致每次链接传送的数据增大
* 支持B/C C/S 模式(不懂)

> ### 关于URL
> HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。URL是一种特殊类型的URI，包含了用于查找某个资源的足够的信息
>
>
> ***URL***,全称是UniformResourceLocator, 中文叫统一资源定位符,是互联网上用来标识某一处资源的地址。
>
> **组成部分**   
>    * 协议：http/https
>    * 域名：如[google.com](http://www.google.com)
>    * 端口： 如localhost:8888(可省略，则使用默认端口)
>    * 虚拟目录：/balabala/balabala
>    * 文件名：Internship/index.html
>    * 锚：#balabala
>    * 参数：boardID=6&ID=123456


> ### 关于URI
> **组成部分**
> * 访问资源的命名机制
> * 存放资源的主机名
> * 资源自身的名称,由路径表示,着重强调于资源

## HTTP之请求消息：Request(由客户端发送请求到服务器)

**组成部分(格式)**
* 请求行(request line)
* 请求头部(request head)
* 空行
* 请求数据

![request请求格式](https://upload-images.jianshu.io/upload_images/2964446-fdfb1a8fce8de946.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/466)

如:
> POST / HTTP1.1   
> Host:www.wrox.com   
User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)   
>Content-Type:application/x-www-form-urlencoded
Content-Length:40   
Connection: Keep-Alive   
>
>name=Professional%20Ajax&publisher=Wiley

## HTTP之响应消息：Response
**组成部分**
* 状态行
* 消息报头
* 空行
* 相应正文

![](https://upload-images.jianshu.io/upload_images/2964446-1c4cab46f270d8ee.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/683)

如：
> HTTP/1.1 200 OK  
Date: Fri, 22 May 2009 06:07:21 GMT   
Content-Type: text/html; charset=UTF-8

<html>
      <head></head>
      <body>
            <!--body goes here-->
      </body>
</html>

## HTTP之状态码()
> 第一个数字定义了响应类别(共五类)

* 1xx: 提示信息--表示请求已接收，继续处理
* 2xx: 成功--表示请求已被成功接受、理解、接受
* 3xx: 重定向--表示完成请求必须进行进一步的操作
* 4xx: 客户端错误--请求有语法错误或请求无法实现
* 5xx: 服务端错误--服务器未能实现合法的请求   
### 常见状态码   
`200 OK                        //客户端请求成功`   
`400 Bad Request               //客户端请求有语法错误，不能被服务器所理解  `   
`401 Unauthorized              //请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用`   
`403 Forbidden                 //服务器收到请求，但是拒绝提供服务`   
`404 Not Found                 //请求资源不存在，eg：输入了错误的URL`  
`500 Internal Server Error     //服务器发生不可预期的错误`    
`503 Server Unavailable        //服务器当前不能处理客户端的请求，一段时间后可能恢复正常`   

## HTTP请求方法
HTTP1.0 : GET POST HEAD
HTTP1.1 : 新增 OPTIONS PUT DELETE TRACE CONNET
> **具体含义**   
> GET    
    请求指定的页面信息，并返回实体主体。   
> HEAD      
类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头   
POST     
向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。   
PUT  
从客户端向服务器传送的数据取代指定的文档的内容。   
DELETE   
请求服务器删除指定的页面。      
CONNECT  
HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。   
OPTIONS  
允许客户端查看服务器的性能。   
TRACE    
回显服务器收到的请求，主要用于测试或诊断。

