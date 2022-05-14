import { Socket } from 'socket.io';
import { SettingParams, JoinParams, MoveParams, QuizResponseParams } from './types';

type WrapWithSocket<TFunction extends (...args: any) => any> = (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  ...args: [...Parameters<TFunction>]
) => ReturnType<TFunction>;

type CreateCallback = (settingParams: SettingParams) => void;
type JoinCallback = (joinParams: JoinParams) => void;
type MoveCallback = (moveParams: MoveParams) => void;
type QuizResponseCallback = (quizResponseParams: QuizResponseParams) => void;

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

export type ServerToClientEvents = {};
