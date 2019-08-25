import request from "@/util/request"

export function SetArticle(datas) {
  return request({
    url: "/admin/SetArticle",
    method: "POST",
    data: datas
  })
}

export function AddArticle(datas) {
  return request({
    url: "/admin/AddArticle",
    method: "POST",
    data: datas
  })
}

export function Uploads(datas) {
  return request({
    url: "/admin/upload",
    method: "POST",
    data: datas
  })
}
export function Upload2(datas) {
  return request({
    url: "/upload",
    method: "POST",
    data: datas
  })
}

export function AddPPT(datas) {
  return request({
    url: "/admin/AddPPT",
    method: "POST",
    data: datas
  })
}

export function Login(datas) {
  return request({
    url: "/auth/login",
    method: "POST",
    data: datas
  })
}

export function EditorPPT(datas) {
  return request({
    url: "/admin/EditorPPT",
    method: "POST",
    data: datas
  })
}

export function SetLantern(datas) {
  return request({
    url: "/admin/SetLantern",
    method: "POST",
    data: datas
  })
}

export function DeleteComment(datas) {
  return request({
    url: "/admin/delete_comment",
    method: "POST",
    data: datas
  })
}