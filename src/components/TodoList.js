import React, { useState, useEffect, Suspense } from "react";
import {
  Grid,
  Loading,
  Input,
  Button,
  useTheme,
  Text,
  Pagination,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "./Box";
import TodoCard from "./TodoCard";
import { GetTodos, AddTodo } from "../api/http/todosRequest";
import {GetPhotos} from "../api/http/unsplashRequest"

const TodoList = () => {
  const { theme } = useTheme();
  const [todos, setTodos] = useState([]);
  const [photos,setPhotos] = useState([])
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 8;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const notify = (proccess) => toast(proccess);

  const handleAddTodo = () => {
    setLoading(true);
    const query = {
      content,
    };
    AddTodo(query)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        GetTodos()
          .then((res) => {
            setTodos(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
            notify("Success");
          });
      });
    setContent("");
  };

  useEffect(() => {
    GetTodos()
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      GetPhotos().then((res) => setPhotos(res.data.urls.regular))
  }, []);

  if (todos.length > 0) {
    return (
      <Suspense
        fallback={
          <Box
            css={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading
              type="default"
              loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
            />
          </Box>
        }
      >
        <Box css={{ mt: "$5" }}>
          <Box
            css={{
              mt: "$15",
              mb: "$10",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              width="400px"
              clearable
              bordered
              labelPlaceholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              onClick={handleAddTodo}
              css={{ ml: "$10" }}
              color={theme.colors.gray800.value}
              auto
            >
              <Text b color={theme.colors.black.value}>
                Add
              </Text>
            </Button>
          </Box>
          <Pagination
          css={{
            float:"right",
            position:"relative"
          }}
            onClick={(e) => {
              setCurrentPage(Number(e.target.textContent));
            }}
            total={
              todos.length % todosPerPage === 0
                ? todos.length / todosPerPage
                : Math.floor(todos.length / todosPerPage + 1)
            }
            initialPage={currentPage}
          />
          <Grid.Container gap={2} justify="flex-start">
            {currentTodos.map((item) => (
              <Grid key={item.id} xs={10} sm={6} md={3}>
                <TodoCard
                  photos={photos}
                  setLoading={setLoading}
                  setTodos={setTodos}
                  item={item}
                />
              </Grid>
            ))}
          </Grid.Container>
         
        </Box>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Suspense>
    );
  }
  if (todos.length === 0 || isLoading === true) {
    return (
      <Box
        css={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading
          type="default"
          loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
        />
      </Box>
    );
  } else {
  }
};

export default TodoList;
