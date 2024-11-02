import axios from "axios";

// get Tasks
export async function getAllTasks() {
  try {
    const token = localStorage.getItem("site");

    if (!token) {
      console.log("please login");
      return [];
    }

    const response = await axios.get("http://localhost:5500/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      console.error("Unexpected response structure:", response.data);
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error during fetching data -> " + error.message);
    }
  }
}

// update task status
export async function updateTaskStatus(id: string) {
  try {
    await axios.put(`http://localhost:5500/tasks/${id}/completed`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error during fetching data -> " + error.message);
    }
  }
}

// create Task
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTask(data: any) {
  try {
    const token = localStorage.getItem("site");
    await axios.post("http://localhost:5500/tasks", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error during creating task -> " + error.message);
    }
  }
}

// update Task
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateTask(id: string, data: any) {
  try {
    await axios.put(`http://localhost:5500/tasks/${id}`, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error during fetching data -> " + error.message);
    }
  }
}

// delete Task
export async function deleteTask(id: string) {
  try {
    await axios.delete(`http://localhost:5500/tasks/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error during fetching data -> " + error.message);
    }
  }
}
