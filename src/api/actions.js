const baseURI = "http://localhost:5000/api"

const user = JSON.parse(localStorage.getItem("user"))
const token = localStorage.getItem("token")

export const fetchNotes = async () => {
  const uid = user._id
  const result = await fetch(`${baseURI}/notes/user/${uid}`, {
    headers: {
      Authorization: token
    }
  })
  if (result.ok) {
    return await result.json()
  } else {
    throw `Something went wrong ${await result.json()}`
  }
}

export const deleteNote = async id => {
  const result = await fetch(`${baseURI}/notes/${id}`, {
    method: "delete",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
  if (result.ok) {
    return "ok"
  } else {
    throw `Something went wrong ${await result.json()}`
  }
}
