export default {
  async addTask(context, payload) {
    const response = await fetch(
      `https://project-pad-9d0c4-default-rtdb.firebaseio.com/tasks.json`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "failed to fetch none technical error"
      );
      throw error;
    }

    payload.id = responseData.name;

    context.commit("addTask", payload);
  },

  async fetchTask(context) {
    if (!context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      "https://project-pad-9d0c4-default-rtdb.firebaseio.com/tasks.json"
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "failed to fetch none technical error"
      );
      throw error;
    }

    const tasks = [];
    for (const id in responseData) {
      const taskDetails = {
        id: id,
        title: responseData[id].title,
        person: responseData[id].person,
        due: responseData[id].due,
        status: responseData[id].status,
        icon: responseData[id].icon,
        description: responseData[id].description,
      };
      tasks.push(taskDetails);
    }

    context.commit("setTasks", tasks);
    context.commit("setLastFetch");
  },
  async editTask(context, payload) {
    fetch(
      `https://project-pad-9d0c4-default-rtdb.firebaseio.com/tasks/${payload.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: payload.title,
          person: payload.person,
          description: payload.description,
          due: payload.due,
        }),
      }
    );
    context.commit("editTask", payload);
  },
  deleteTask(context, payload) {
    context.commit("deleteTask", payload);
  },
};
