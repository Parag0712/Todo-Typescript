import { AppBar, Button, Container, Grid, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TodoItem from "./components/TodoItem"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getTodos, saveLocal } from "./assets/utils/features";
function App() {
  const [task, setTask] = useState<TodoItemType["title"]>("");
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos())


  // Delete Handler
  const deleteHandler = (id: TodoItemType["id"]): void => {
    const todo = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(todo)
  };

  // Complete Handler
  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((item) => {
      if (item.id == id) item.isCompleted = !item.isCompleted;
      return item;
    })
    setTodos(newTodos);
  }

  // Edit Handler
  const editHandler = (id: TodoItemType["id"],textVal:TodoItemType["title"]): void => {
    const newTodo:TodoItemType[] = todos.map((item)=>{
      if(item.id == id){
        item.title = textVal;
      }
      return item;
    });
    setTodos(newTodo)
  };

  // AddTodo Handler
  const addTodoHandler = () => {
    const newTodo: TodoItemType = {
      id: String(Math.random() * 1000),
      isCompleted: false,
      title: task
    }
    setTodos(prev => [...prev!, newTodo])
    setTask("");
  }

  useEffect(() => {
    saveLocal(todos);
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"70%"} overflow={"auto"} direction={"column"} spacing={"1rem"} p={"12px"}>
        {
          todos.map((i) => {
            return <TodoItem
              key={i.id}
              todo={i}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
            />
          })
        }
      </Stack>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <TextField
          id="outlined-password-input"
          label="New Task"
          type="text"
          fullWidth
          inputProps={{ style: { height: "100%" } }}
          autoComplete="current-password"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && task !== "") addTodoHandler();
          }}
        />
        <Button sx={{ marginTop: "10px" }} fullWidth variant="contained" endIcon={<AddBoxIcon />}
          disabled={task === ""}
          onClick={addTodoHandler}>
          Add Task
        </Button>
      </Grid>
    </Container>
  )
}

export default App