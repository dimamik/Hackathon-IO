import { Socket } from 'socket.io';
import {
  csCreateParams,
  csJoinParams,
  csMoveParams,
  csQuizParams,
  scCreatedParams,
} from './dto';

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

type WrapWithSocket<TFunction extends (...args: any) => any> = (
  socket: ServerSocket,
  ...args: [...Parameters<TFunction>]
) => ReturnType<TFunction>;

type CreateCallback = (settingParams: csCreateParams) => void;
type JoinCallback = (joinParams: csJoinParams) => void;
type MoveCallback = (moveParams: csMoveParams) => void;
type QuizResponseCallback = (quizResponseParams: csQuizParams) => void;

type CreatedCallback = (createdParams: scCreatedParams) => void;

export type CreateHandler = WrapWithSocket<CreateCallback>;
export type JoinHandler = WrapWithSocket<JoinCallback>;
export type MoveHandler = WrapWithSocket<MoveCallback>;
export type QuizResponseHandler = WrapWithSocket<QuizResponseCallback>;

export type CreatedHandler = WrapWithSocket<CreatedCallback>;

export type ClientToServerEvents = {
  create: CreateCallback;
  join: JoinCallback;
  move: MoveCallback;
  quizResponse: QuizResponseCallback;
};

export type ServerToClientEvents = {
  created: CreatedCallback;
};
