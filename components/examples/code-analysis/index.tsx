import { useState } from 'react';
import Button from 'design-system/button';
import TimeoutButton from 'design-system/timeout-button';
import CodeBlock from 'design-system/code-block';
import Stack from 'design-system/stack';
import Inline from 'design-system/inline';
import Text from 'design-system/text';

const steps = [
  `const focusRing = {
  boxShadow: '0 0 0 2px blue',
};`,
  `const bigHeading = \`
  font-size: 20px;
\`;`,
  `const getStyles = (state, isDisabled) => {
  let color = '';

  if (state === 'hovered') {
    color = 'gray';
  }

  if (state === 'pressed' && !isDisabled) {
    color = 'blue';
  }

  return css\`
    color: \${color};
  \`;
};`,
  `styled.div\`
  \${prop => prop.isDisabled ? { color: 'gray' } : { color: 'blue' }}
\`;`,
  `const smallFontStyles = css({
  fontSize: 12
});`,
];

const stepDescription = [
  <Text key="1" color="danger" isSmall>
    Could be styles but also could just be an object
  </Text>,
  <Text key="1" color="danger" isSmall>
    Same problem with template literals
  </Text>,
  <Text key="1" color="warning" isSmall>
    Clear call site is better but function indirection makes analysis harder
  </Text>,
  <Text key="1" color="warning" isSmall>
    Template literal styles with interpolations make analysis harder
  </Text>,
  <Text key="1" color="success" isSmall>
    Simple works best separating style composition from declaration
  </Text>,
];

function CodeAnalysis() {
  const [step, setStep] = useState(0);
  const code = steps[step];

  return (
    <Stack gap={2}>
      <Inline justify="middle" gap={1}>
        <Button
          data-splitbee-event="Previous"
          data-splitbee-event-type="Code Analysis Example"
          isDisabled={step === 0}
          onClick={() => setStep((next) => next - 1)}>
          Previous
        </Button>
        <TimeoutButton
          data-splitbee-event="Next"
          data-splitbee-event-type="Code Analysis Example"
          data-splitbee-event-finish={steps[step + 2] === undefined ? 'true' : undefined}
          isDisabled={steps[step + 1] === undefined}
          onClick={() => setStep((next) => next + 1)}>
          Next
        </TimeoutButton>
        <Inline marginLeft="auto">
          <strong>{stepDescription[step]}</strong>
        </Inline>
      </Inline>

      <CodeBlock>{code}</CodeBlock>
    </Stack>
  );
}

export default CodeAnalysis;
