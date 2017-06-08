'use strict';
const Arrow = require('arrowjs');

/* 
  Khởi tạo một instance mới của class ArrowApplication gán với biến application
  Chạy qua phần constructor để gán các properties của Arrow
  Lưu các config obj vào property _config
  Lưu structure vào structure
  Gom tất các module cần thiết vào property middleware
  Tính năng ngôn ngữ - loadingLanguage()
  Gán các hàm hỗ trợ trong helpers - loadingGlobalFunction()
  Tất cả các features routes được lưu vào _arrRoutes
  Gom các module utils
  
 */
const application = new Arrow();
/*
  Sau khi khởi tạo instance chạy method start() 
*/
application.start();