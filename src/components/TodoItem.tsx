import { Delete, Edit, Save } from "@mui/icons-material"
import { Button, Paper, Checkbox, Typography, Stack, TextField } from "@mui/material"
import { useState } from "react"

type PropsType = {
    todo: TodoItemType
    deleteHandler: (id: TodoItemType["id"]) => void
    editHandler: (id: TodoItemType["id"], textVal: TodoItemType["title"]) => void
    completeHandler:(id:TodoItemType["id"])=>void
}

function TodoItem({ todo, editHandler, deleteHandler ,completeHandler}: PropsType) {

    const [editActive, setEditActive] = useState<boolean>(false);
    const [textVal, setTextVal] = useState<string>(todo.title);
    return (
        <Paper variant={"outlined"} sx={{
            padding: "0.5rem"
        }}>
            <Stack direction={"row"} alignItems={"center"}>
                {

                    editActive ? (
                        <TextField
                            value={textVal}
                            onChange={(e) => setTextVal(e.target.value)}
                            fullWidth
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && textVal !== "") {
                                    editHandler(todo.id, textVal);
                                    setEditActive(false);
                                }
                            }}
                        >
                        </TextField>
                    ) :
                        (<Typography marginRight={"auto"}>
                            {todo.title} {todo.isCompleted && "Completed"}
                        </Typography>)

                }<Checkbox onChange={()=>{completeHandler(todo.id)}}
                    checked={todo.isCompleted}
                />
                <Button color="secondary"
                    disabled={editActive && textVal == ""}
                    onClick={() => {
                        setEditActive((prev) => !prev)
                        if (editActive ) {
                            editHandler(todo.id, textVal);
                            setEditActive(false);
                        }
                    }} >
                    {
                        editActive ?
                            <Save></Save>
                            :
                            <Edit></Edit>
                    }


                </Button>

                <Button color="error"
                    onClick={() => { deleteHandler(todo.id) }} >
                    <Delete></Delete>
                </Button>
            </Stack>
        </Paper>
    )
}

export default TodoItem