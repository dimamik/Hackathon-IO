import { Socket } from 'socket.io';
import {
  csCreateParams,
  csJoinParams,
  csMoveParams,
  csQuizParams,
  scCreatedParams,
  csRoundParams,
} from './dto';

type WrapWithSocket<TFunction extends (...args: any) => any> = (
  socket: ServerSocket,
  ...args: [...Parameters<TFunction>]
) => ReturnType<TFunction>;

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>; // BACKEND MODEL
export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>; // FRONTEND MODEL

// backend event handlers
type CreateCallback = (settingParams: csCreateParams) => void;
type JoinCallback = (joinParams: csJoinParams) => void;
type MoveCallback = (moveParams: csMoveParams) => void;
type QuizResponseCallback = (quizResponseParams: csQuizParams) => void;

export type CreateHandler = WrapWithSocket<CreateCallback>;
export type JoinHandler = WrapWithSocket<JoinCallback>;
export type MoveHandler = WrapWithSocket<MoveCallback>;
export type QuizResponseHandler = WrapWithSocket<QuizResponseCallback>;

export type ClientToServerEvents = {
  create: CreateCallback;
  join: JoinCallback;
  move: MoveCallback;
  quizResponse: QuizResponseCallback;
};

// frontend event handlers
type CreatedCallback = (createdParams: scCreatedParams) => void;
type RoundCallback = (roundParams: csRoundParams) => void;

export type CreatedHandler = WrapWithSocket<CreatedCallback>;
export type RoundHandler = RoundCallback;

export type ServerToClientEvents = {
  created: CreatedCallback;
  round: RoundCallback;
};
