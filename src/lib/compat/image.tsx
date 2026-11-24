import type { ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  sizes?: string;
};

/** Plain <img> replacement for framework image components. */
export default function Image({ fill, priority, quality: _q, unoptimized: _u, style, ...rest }: Props) {
  return (
    <img
      loading={priority ? 'eager' : 'lazy'}
      style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style}
      {...rest}
    />
  );
}
