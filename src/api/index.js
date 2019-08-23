// implement your own methods in here, if your data is coming from A rest API

import * as User from "./user"
import * as Activity from "./activity"
import * as Files from "./file"
import * as Project from "./project"
export default {
  // user
  getUser: User.getUser,
  getUserById: User.getUserById,
  // project
  getProject: Project.getProject,
  // activity
  getActivity: Activity.default.getActivity,
  // FIle
  getFile: Files.getFile,
  getFileMenu: Files.getFileMenu
}
