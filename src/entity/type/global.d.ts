type PPT<T> = {
  [P in keyof T]?: T[P]
}

interface Todo {
  title: string
  description: string
}

type a = PPT<Todo>
