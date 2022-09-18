import { useState } from "react";
import {
  Card,
  Col,
  Row,
  Tooltip,
  Text,
  Badge,
  Modal,
  Input,
  Button,
  Radio,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { DeleteTodo, GetTodos, UpdateTodo } from "../api/http/todosRequest";
import { GetPhotos } from "../api/http/unsplashRequest";
import { DeleteIcon } from "./icons/deleteIcon";
import { IconButton } from "./icons/IconButton";
import { EditIcon } from "./icons/editIcon";
import { EyeIcon } from "./icons/eyeIcon";

const TodoCard = ({ item, setTodos, setLoading }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(item.content);
  const [completed, setCompleted] = useState(null);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const notify = (proccess) => toast(proccess);

  const handleDeleteTodo = (id) => {
    setLoading(true);
    DeleteTodo(id)
      .then((res) => notify("Deleting"))
      .catch((err) => {
        notify("Upss somethings went wrong")
      })
      .finally(() => {
        GetTodos().then((res) => setTodos(res.data));
        notify("Deleted");
      });
    setLoading(false);
  };

  const handleSetCompleted = (id) => {
    const query = {
      isCompleted: !item.isCompleted,
    };
    UpdateTodo(id, query)
      .then((res) => notify("Updating"))
      .catch((err) => {
        notify("Upss somethings went wrong")
      })
      .finally(() => {
        GetTodos().then((res) => setTodos(res.data));
        notify("Updated");
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdateTodo()
    }
  }

  const handleUpdateTodo = (id) => {
    const query = {
      isCompleted: completed === null ? item.isCompleted : completed,
      content: content === "" ? item.content : content,
    };
    GetPhotos(query.content).then((res) => {
      UpdateTodo(id, {
        isCompleted: completed === null ? item.isCompleted : completed,
      content: content === "" ? item.content : content,
      imgUrl:res.data.results[Math.floor(Math.random() * 10)].urls.regular
      })
      .then((res) => notify("Updating"))
      .catch((err) => {
        notify("Upss somethings went wrong")
      })
      .finally(() => {
        GetTodos().then((res) => setTodos(res.data));
        notify("Updated");
      });
    }).catch((err) => {
      UpdateTodo(id, {
        isCompleted: completed === null ? item.isCompleted : completed,
      content: content === "" ? item.content : content,
      imgUrl:"https://nextui.org/images/card-example-6.jpeg"
      })
      .then((res) => notify("Updating"))
      .catch((err) => {
        notify("Upss somethings went wrong")
      })
      .finally(() => {
        GetTodos().then((res) => setTodos(res.data));
        notify("Updated");
      });
    })
    
    setVisible(false);
  };
  return (
    <>
      <Card>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Tooltip
              content={
                item.isCompleted === true ? "Completed" : "Not Completed"
              }
              color={item.isCompleted === true ? "success" : "error"}
            >
              <Badge
                css={{ border: "none" }}
                color={item.isCompleted === true ? "success" : "error"}
                variant="points"
              />
            </Tooltip>
            <Badge enableShadow disableOutline>
              {item.content}
            </Badge>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={item.imgUrl ? item.imgUrl : "https://nextui.org/images/card-example-6.jpeg"}
            width="100%"
            height={300}
            objectFit="cover"
            alt="Card example background"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Tooltip content="Edit Todo">
              <IconButton onClick={handler}>
                <EditIcon size={30} fill="#16181A" />
              </IconButton>
            </Tooltip>
            <Tooltip
              content={
                item.isCompleted === true ? "Do UnCompleted" : "Do Completed"
              }
            >
              <IconButton
                css={{ ml: "20px" }}
                onClick={() => handleSetCompleted(item.id)}
              >
                <EyeIcon size={30} fill="#16181A" />
              </IconButton>
            </Tooltip>
            <Col>
              <Row justify="flex-end">
                <Tooltip content="Delete Todo" color="error">
                  <IconButton onClick={() => handleDeleteTodo(item.id)}>
                    <DeleteIcon size={30} fill="#FF0080" />
                  </IconButton>
                </Tooltip>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
         
          
            <Text b size={18}>
            Edit Todo 
            </Text>
          
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Row justify="space-between">
            <Radio.Group
              onChange={(e) => {
                setCompleted(e);
              }}
              label="Status"
              defaultValue={item.isCompleted}
            >
              <Radio value={true}>Completed</Radio>
              <Radio value={false}>Not Completed</Radio>
            </Radio.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={() => handleUpdateTodo(item.id)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoCard;
