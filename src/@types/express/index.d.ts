declare namespace Express {
  export interface Request {
    user: {
      id_modo: number;
      user_type: string;
      id_usuario: number;
    };
  }
}
