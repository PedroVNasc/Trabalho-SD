import { ITask } from "../models/task-model";
import { conlog } from "../utils/utils";

// importing functions to process the tasks
import { createUser, deleteUser, updateUser } from "./user-tasks";

// Function to process all tasks
export const allTasks = (task: ITask) => {
    switch (task.type) {
        case "create/user":
            createUser(task);
            break;
        case "update/user":
            updateUser(task);
            break;
        case "delete/user":
            deleteUser(task);
            break;
        default:
            conlog(
                `Task type not recognized! Ignoring... \nTask: ID=${task.id}, Type=${task.type}, Data=${task.data}`
            );
            return true;
    }

    return false;
};
