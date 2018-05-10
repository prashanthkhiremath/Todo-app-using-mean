export class Todo {
  constructor(
    public task: string,
    public priority: string,
    public date: string,
    public completed?: boolean,
    public id?: string,
  ) {}
}
