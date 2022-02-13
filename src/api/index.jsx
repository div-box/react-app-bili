import { get, post } from "@/utils/request";
import jsonp from "jsonp";
import { message } from "antd";

export const reqLogin = (data) => {
  return post("/login", data);
};

export const reqAssUser = (data) => {
  return post("/manage/user/add", data);
};
//获取分类列表
export const getProductsTypeList = (data) => {
  return get("/manage/category/list", data);
};
//新增分类列表
export const addProductsTypeList = (data) => {
  return post("/manage/category/add", data);
};
//修改分类列表
export const updateProductsTypeList = (data) => {
  return post("/manage/category/update", data);
};
//获取商品列表
export const getProductsList = (data) => {
  return get("/manage/product/list", data);
};
//添加商品
export const addProductsList = (data) => {
  return post("/manage/product/add", data);
};
//修改商品
export const updateProductsList = (data) => {
  return post("/manage/product/update", data);
};
//根据id获取分类信息
export const reqCategory = (data) => {
  return get("/manage/category/info", data);
};
//改变商品状态
export const changeStatus = (data) => {
  return post("/manage/product/updateStatus", data);
};
//删除服务器图片
export const deleteImg = (data) => {
  return post("/manage/img/delete", data);
};
//获取角色列表
export const getRolesList = (data) => {
  return get("/manage/role/list", data);
};
//添加角色
export const addRole = (data) => {
  return post("/manage/role/add", data);
};
//更新角色
export const updateRole = (data) => {
  return post("/manage/role/update", data);
};

//获取用户列表
export const getUserList = (data) => {
  return get("/manage/user/list", data);
};
//添加用户
export const addUser = (data) => {
  return post("/manage/user/add", data);
};
//更新用户
export const updateUser = (data) => {
  return post("/manage/user/update", data);
};
//删除用户
export const deleteUser = (data) => {
  return post("/manage/user/delete", data);
};

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log("jsonp()", err, data);
      // 如果成功了
      if (!err && data.status === "success") {
        // 取出需要的数据
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });
      } else {
        // 如果失败了
        message.error("获取天气信息失败!");
      }
    });
  });
};
