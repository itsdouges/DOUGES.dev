/** @jsxImportSource @emotion/react */
import css from 'design-system/css';
import { useState, Fragment } from 'react';
import Textfield from 'design-system/textfield';
import Label from 'design-system/label';
import Button from 'design-system/button';
import Heading from 'design-system/heading';
import Stack from 'design-system/stack';
import Text from 'design-system/text';
import Inline from 'design-system/inline';

const styles = css({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

const sendSignUpRequest = async (email: string) => {
  const formData = new FormData();
  formData.append('email', email);

  await fetch('https://buttondown.email/api/emails/embed-subscribe/douges.dev', {
    method: 'POST',
    body: formData,
  });
};

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [email, setEmail] = useState('');
  const id = 'mailing-list';

  return (
    <Stack gap="regular">
      <Heading level={3}>Like it? Come hang again!</Heading>
      <Text as="p">
        Join others and get notified early when new content is available – unsubscribe at any time.
      </Text>

      <form
        data-splitbee-event="Submit Mailing List Form"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          await sendSignUpRequest(email);
          setIsComplete(true);
        }}>
        <Label htmlFor={id} label="Join the mailing list today">
          <Inline blockAlign="stretch" gap="regular">
            <Textfield
              isRequired
              isDisabled={isLoading}
              type="email"
              name={id}
              id={id}
              onChange={setEmail}
            />
            <Button type="submit" isDisabled={isLoading} appearance="primary">
              {isComplete ? <Text color="success">✓</Text> : 'Join'}
            </Button>
          </Inline>
        </Label>
      </form>
    </Stack>
  );
}

export default SignUp;
