export const getAllTodos = async (request: Bun.BunRequest): Promise<Response> => {
  const addDays = (daysCount: number) => {
    return 1000 * 60 * 60 * 24 * daysCount;
  };

  const todos = ([
    {
      id: 1,
      status: 'completed',
      task: 'Do homework',
      expireDate: new Date(Date.now() + addDays(1)).toLocaleDateString(),
    }, {
      id: 2,
      status: 'in progress',
      task: 'Wash car',
      expireDate: new Date(Date.now() + addDays(2)).toLocaleDateString(),
    }, {
      id: 3,
      status: 'waited',
      task: 'Read "Clean code"',
      expireDate: new Date(Date.now() + addDays(4)).toLocaleDateString(),
    },
  ]);
  return new Response(JSON.stringify(todos));
};
