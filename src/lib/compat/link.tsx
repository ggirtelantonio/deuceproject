import { Link as TsLink } from '@tanstack/react-router';
import type { AnchorHTMLAttributes, Ref } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | { pathname: string };
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  ref?: Ref<HTMLAnchorElement>;
};

/** href-based link backed by TanStack Router (external URLs fall back to <a>). */
export default function Link({ href, prefetch: _p, scroll: _s, replace, ref, ...rest }: Props) {
  const url = typeof href === 'string' ? href : href.pathname;
  if (/^(https?:|mailto:|tel:|#)/.test(url)) return <a ref={ref} href={url} {...rest} />;
  return <TsLink ref={ref} to={url as never} replace={replace} {...(rest as object)} />;
}
