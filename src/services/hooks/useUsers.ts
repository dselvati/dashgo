import { useQuery, UseQueryOptions } from "react-query"
import { api } from "../api"

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUsersResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  // const response = await fetch('http://localhost:3000/api/users')
  const { data, headers } = await api.get('users', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(({ id, name, email, created_at: createdAt }) => {
    return {
      id,
      name,
      email,
      createdAt: new Date(createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })


  return {
    users,
    totalCount
  }
}

export function useUsers(page: number, options: UseQueryOptions) {
  // return useQuery<User[]>('users', getUsers, {
  //   staleTime: 1000 * 5 // 5 seconds
  // })
  return useQuery(['users', page], () => getUsers(page), { // Manter o nome do 'users' por página, se não sempre vai usar a mesma                            
    staleTime: 1000 * 60 * 10, // 10 minutos
    ...options
  })
}