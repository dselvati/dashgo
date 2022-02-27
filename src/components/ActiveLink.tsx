import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExatchHref?: boolean
}

export function ActiveLink({ children, shouldMatchExatchHref = false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()

  let isActive = false

  if (shouldMatchExatchHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (!shouldMatchExatchHref &&
    (asPath.startsWith(String(rest.href)) ||
      asPath.startsWith(String(rest.as))
    )) {
    isActive = true
  }

  // console.log('asPath', asPath) // /users/create
  // console.log('rest.href', rest.href) // /users
  // console.log('rest.as', rest.as)

  return (
    <Link
      {...rest}
    >
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}