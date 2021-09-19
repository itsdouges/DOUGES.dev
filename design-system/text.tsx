/** @jsxImportSource @emotion/react */
import { token } from '@atlaskit/tokens';
import css from 'design-system/css';

const styles = css({
  truncate: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

const textStyles = css({
  regular: {
    fontSize: 18,
    margin: 0,
  },
  small: {
    fontSize: 16,
    margin: 0,
  },
  smaller: {
    fontSize: 14,
    margin: 0,
  },
  smallest: {
    fontSize: 11,
  },
});

const colorStyles = css({
  low: { color: token('color.text.lowEmphasis') },
  medium: { color: token('color.text.mediumEmphasis') },
  high: { color: token('color.text.highEmphasis') },
  success: { color: token('color.text.success') },
  warning: { color: token('color.text.warning') },
  brand: { color: token('color.text.brand') },
  danger: { color: token('color.text.danger') },
  discovery: { color: token('color.text.discovery') },
  selected: { color: token('color.text.selected') },
  link: { color: token('color.text.link.resting') },
  onBold: { color: token('color.text.onBold') },
  onBoldWarning: { color: token('color.text.onBoldWarning') },
  disabled: { color: token('color.text.disabled') },
  inherit: {},
});

const weightStyles = css({
  bold: {
    fontWeight: 500,
  },
  bolder: {
    fontWeight: 700,
  },
  regular: {},
});

const textTransformStyles = css({
  none: {},
  uppercase: {
    textTransform: 'uppercase',
  },
});

export type TextColor = keyof typeof colorStyles;
export type TextWeight = keyof typeof weightStyles;
export type TextSize = keyof typeof textStyles;

interface TextProps {
  children: React.ReactNode;
  as?: 'span' | 'div' | 'p';
  color?: keyof typeof colorStyles;
  size?: keyof typeof textStyles;
  weight?: keyof typeof weightStyles;
  transform?: keyof typeof textTransformStyles;
  shouldTruncate?: boolean;
}

function Text({
  children,
  as: Markup = 'span',
  color = 'inherit',
  size = 'regular',
  weight = 'regular',
  transform = 'none',
  shouldTruncate,
}: TextProps) {
  const colorStyle = colorStyles[color];
  const textStyle = textStyles[size];
  const weightStyle = weightStyles[weight];
  const textTransformStyle = textTransformStyles[transform];

  return (
    <Markup
      css={[
        textStyle,
        shouldTruncate && styles.truncate,
        colorStyle,
        weightStyle,
        textTransformStyle,
      ]}>
      {children}
    </Markup>
  );
}

export default Text;
