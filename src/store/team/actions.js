export default {
  async addMember(context, data) {
    const response = await fetch(
      "https://project-pad-9d0c4-default-rtdb.firebaseio.com/team.json",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "failed to fetch none technical error"
      );
      throw error;
    }

    data.id = responseData.name;

    // the data is sent with the id of the added team member everthing works just fine in this sending function.
    context.commit("addMember", data);
  },

  async fetchMembers(context) {
    if (!context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      "https://project-pad-9d0c4-default-rtdb.firebaseio.com/team.json"
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "failed to fetch none technical error"
      );
      throw error;
    }

    const team = [];
    for (const id in responseData) {
      const teamDetails = {
        id: id,
        name: responseData[id].name,
        image: responseData[id].image,
        role: responseData[id].role,
      };
      team.push(teamDetails);
    }

    // this function get the data of team members successfully and set the team array in index correctly
    context.commit("setTeam", team);
    context.commit("setLastFetch");
  },
  editMember(context, payload) {
    fetch(
      `https://project-pad-9d0c4-default-rtdb.firebaseio.com/team/${payload.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: payload.name,
          role: payload.role,
          image: payload.image,
        }),
      }
    );
    context.commit("editMember", payload);
  },
};
