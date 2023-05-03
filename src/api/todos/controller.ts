import { RequestHandler, Request, Response } from 'express';
import Todo, { TodoI } from './model';
import asyncWrapper from '../../lib/try-catch-wrapper';

interface RequestParams {
  id: string;
}

interface RequestBody {
  title: string;
  complete?: boolean;
  tags?: string[];
}

interface RequestQuery {
  limit: string;
  page: string;
  tag: string;
}

const getTodo: RequestHandler = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  if (todo == null) {
    return res.status(404).json({ Error: 'Resource Not Found' });
  }
  res.json(todo);
};

const getTodos = async (
  req: Request<{}, {}, {}, RequestQuery>,
  res: Response
) => {
  const { limit = '0', page = '0', tag } = req.query;

  let filter: Record<string, any> = {};
  if (tag) filter.tags = tag;

  const todos = await Todo.find(filter)
    .skip(+page * +limit)
    .limit(+limit);

  const totalCount = await Todo.countDocuments(filter);

  res.json({
    todos,
    perPage: todos.length,
    totalPages: Math.ceil(totalCount / +limit),
    totalCount,
  });
};

const createTodo = async (req: Request<{}, {}, RequestBody>, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ Error: 'The title field is required' });
  }

  const todo: TodoI = new Todo(req.body);
  await todo.save();
  res.json(todo);
};

const updateTodo = async (
  req: Request<RequestParams, {}, RequestBody>,
  res: Response
) => {
  const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    useFindAndModify: false,
  });
  res.json(todo);
};

const deleteTodo: RequestHandler = async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.json({ Success: 'Successfully deleted todo!' });
};

export default asyncWrapper({
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
});
