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
  const { type, theme } = useTheme();
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 8;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.sort((a,b) => b.id - a.id).slice(indexOfFirstTodo, indexOfLastTodo);


 // console.log(SortedArray)

  const notify = (proccess) => toast(proccess);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  const handleAddTodo = () => {
    setLoading(true);
     GetPhotos(content).then((res) =>  
     AddTodo({content:content,imgUrl:res.data.results[Math.floor(Math.random() * 10)].urls.regular})
     .then((res) => notify("Adding"))
     .catch((err) => notify("Upss somethings went wrong"))
     .finally(() => {
       GetTodos()
         .then((res) => {
           setTodos(res.data);
         })
         .catch((err) => {
          notify("Upss somethings went wrong");
         })
         .finally(() => {
           setLoading(false);
           notify("Success");
         });
     })).catch((err) => {
      AddTodo({content:content,imgUrl:"https://nextui.org/images/card-example-6.jpeg"})
      .then((res) => notify("Adding"))
      .catch((err) => notify("Upss somethings went wrong"))
      .finally(() => {
        GetTodos()
          .then((res) => {
            setTodos(res.data);
          })
          .catch((err) => {
            notify("Upss somethings went wrong");
          })
          .finally(() => {
            setLoading(false);
            notify("Success");
          });
      })
     })
   
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
              onKeyDown={handleKeyDown}
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
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={type === "dark" ? "dark" : "light"}
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
