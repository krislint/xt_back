import request from "@/util/request"

export function GetArticle(datas) {
  return request({
    url: "/admin/GetArticle",
    method: "get",
    params: datas
  })
}

export function GetCities() {
  return request({
    url: "/api/all_city",
    method: "get"
  })
}

export function GetUser() {
  return request({
    url: "/admin/GetUser",
    method: "get"
  })
}

export function GetCategory(datas) {
  return request({
    url: "/api/category",
    method: "get",
    params: datas
  })
}

export function GetImages() {
  return request({
    url: "/admin/GetImages",
    method: "get"
  })
}

export function GetPPTs() {
  return request({
    url: "/admin/GetPPTs",
    method: "get"
  })
}

export function PPTDetail(datas) {
  return request({
    url: "/admin/PPTDetail",
    method: "get",
    params: datas
  })
}

export function pptppps() {
  return request({
    url: "/admin/pptppps",
    method: "get"
  })
}

export function AllRooms() {
  return request({
    url: "/admin/classroom",
    method: "get"
  })
}

export function Lantern(datas) {
  return request({
    url: "/api/Lantern",
    method: "get",
    params: datas
  })
}

export function ShortAriticle(datas) {
  return request({
    url: "/admin/short_ariticles",
    method: "get",
    params: datas
  })
}
export function GetComments() {
  return request({
    url: "/admin/GetComments",
    method: "get"
  })
}

export function GetUserInfo(datas) {
  return request({
    url: "/admin/GetUserInfo",
    method: "get",
    params:datas
  })
}